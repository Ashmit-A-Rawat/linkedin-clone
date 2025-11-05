import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Send, 
  Search, 
  MessageCircle, 
  MoreVertical,
  User,
  Home,
  ArrowLeft
} from 'lucide-react';
import axios from 'axios';

const Chat = () => {
  const navigate = useNavigate();
  const { socket, onlineUsers, isConnected } = useSocket();
  const { user } = useAuth();
  
  const API_URL = 'http://localhost:5001/api';
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && socket && isConnected) {
      console.log('👤 Joining chat as user:', user);
      socket.emit('user_join', {
        userId: user._id,
        userName: user.name,
        userRole: 'user'
      });
    }
  }, [user, socket, isConnected]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('🔄 Starting to fetch users...');
        setLoading(true);
        
        console.log('📡 Making API request to:', `${API_URL}/chat/users`);
        
        const response = await axios.get(`${API_URL}/chat/users`);
        
        console.log('✅ API Response received:', response.data);
        
        if (response.data.success) {
          const filteredUsers = response.data.data.users.filter(
            userItem => userItem.userId !== user._id
          );
          console.log('📊 Filtered users data:', filteredUsers);
          setUsers(filteredUsers);
          
          // Initialize unread counts
          const initialUnreadCounts = {};
          filteredUsers.forEach(userItem => {
            initialUnreadCounts[userItem.userId] = 0;
          });
          setUnreadCounts(initialUnreadCounts);
        } else {
          console.error('❌ API returned error:', response.data.message);
          setUsers([]);
        }
      } catch (error) {
        console.error('💥 Error fetching users:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      console.log('👤 Current user detected, fetching users...', user);
      fetchUsers();
    } else {
      console.log('❌ No user found');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!socket) {
      console.log('❌ Socket not available');
      return;
    }

    console.log('🔌 Setting up socket event listeners...');

    const handleReceiveMessage = (data) => {
      console.log('📨 Received new message:', data);
      
      if (selectedUser && (
        data.message.senderId === selectedUser.userId || 
        data.message.receiverId === selectedUser.userId
      )) {
        setMessages(prev => [...prev, data.message]);
        
        // Mark as read if it's from the selected user
        if (data.message.senderId === selectedUser.userId) {
          socket.emit('mark_messages_read', { senderId: selectedUser.userId });
        }
      } else {
        // Update unread count for this user
        if (data.message.senderId && data.message.senderId !== user._id) {
          setUnreadCounts(prev => ({
            ...prev,
            [data.message.senderId]: (prev[data.message.senderId] || 0) + 1
          }));
        }
      }
    };

    const handleMessageSent = (data) => {
      console.log('✅ Message sent confirmation:', data);
      setMessages(prev => [...prev, data.message]);
    };

    const handleConversationData = (data) => {
      console.log('💬 Conversation data received:', data);
      setMessages(data.messages || []);
    };

    const handleUserTyping = (data) => {
      console.log('⌨️ User typing:', data);
      if (selectedUser && data.senderId === selectedUser.userId) {
        setTypingUsers(prev => {
          if (!prev.find(u => u.senderId === data.senderId)) {
            return [...prev, data];
          }
          return prev;
        });
      }
    };

    const handleUserStopTyping = (data) => {
      console.log('⏹️ User stopped typing:', data);
      setTypingUsers(prev => prev.filter(u => u.senderId !== data.senderId));
    };

    const handleMessagesRead = (data) => {
      console.log('📖 Messages read by:', data.readerName);
      if (data.readerId === user._id && selectedUser) {
        setUnreadCounts(prev => ({
          ...prev,
          [selectedUser.userId]: 0
        }));
      }
    };

    const handleOnlineUsersUpdate = (data) => {
      console.log('🌐 Online users updated:', data.onlineUsers);
    };

    // Register event listeners
    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_sent', handleMessageSent);
    socket.on('conversation_data', handleConversationData);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);
    socket.on('messages_read', handleMessagesRead);
    socket.on('online_users_update', handleOnlineUsersUpdate);

    return () => {
      console.log('🧹 Cleaning up socket event listeners');
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_sent', handleMessageSent);
      socket.off('conversation_data', handleConversationData);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
      socket.off('messages_read', handleMessagesRead);
      socket.off('online_users_update', handleOnlineUsersUpdate);
    };
  }, [socket, selectedUser, user]);

  useEffect(() => {
    if (selectedUser && socket) {
      console.log('👥 Loading conversation with user:', selectedUser);
      socket.emit('get_conversation', {
        otherUserId: selectedUser.userId
      });
      
      // Mark messages as read when selecting a user
      socket.emit('mark_messages_read', { senderId: selectedUser.userId });
      
      // Reset unread count for this user
      setUnreadCounts(prev => ({
        ...prev,
        [selectedUser.userId]: 0
      }));
    }
  }, [selectedUser, socket, user]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !socket) {
      console.log('❌ Cannot send message - missing requirements');
      return;
    }

    console.log('📤 Sending message:', {
      to: selectedUser.name,
      content: newMessage.trim(),
      receiverId: selectedUser.userId
    });

    socket.emit('send_message', {
      receiverId: selectedUser.userId,
      content: newMessage.trim()
    });

    setNewMessage('');
    setIsTyping(false);
    
    if (socket) {
      socket.emit('typing_stop', { receiverId: selectedUser.userId });
    }
  }, [newMessage, selectedUser, socket]);

  const handleTyping = useCallback((e) => {
    setNewMessage(e.target.value);

    if (!selectedUser || !socket) return;

    if (!isTyping) {
      setIsTyping(true);
      console.log('⌨️ Starting typing indicator for:', selectedUser.name);
      socket.emit('typing_start', { receiverId: selectedUser.userId });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      console.log('⏹️ Stopping typing indicator for:', selectedUser.name);
      socket.emit('typing_stop', { receiverId: selectedUser.userId });
    }, 1000);
  }, [selectedUser, socket, isTyping]);

  const handleUserSelect = useCallback((selectedUserData) => {
    console.log('🎯 User selected:', selectedUserData);
    setSelectedUser(selectedUserData);
    setMessages([]);
    setTypingUsers([]);
    
    if (socket) {
      console.log('📖 Marking messages as read for:', selectedUserData.name);
      socket.emit('mark_messages_read', { senderId: selectedUserData.userId });
    }
  }, [socket]);

  const handleGoHome = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    if (selectedUser) {
      setSelectedUser(null);
      setMessages([]);
    } else {
      navigate('/dashboard');
    }
  }, [selectedUser, navigate]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isUserOnline = useCallback((userId) => {
    const isOnline = onlineUsers.some(onlineUser => 
      onlineUser.userId === userId || onlineUser.userId?.toString() === userId
    );
    return isOnline;
  }, [onlineUsers]);

  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return '';
    }
  }, []);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return '';
    }
  }, []);

  const getRoleColor = useCallback((role) => {
    const colors = {
      investor: 'bg-purple-100 text-purple-800 border-purple-200',
      admin: 'bg-red-100 text-red-800 border-red-200',
      startup: 'bg-green-100 text-green-800 border-green-200',
      user: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
  }, []);

  const getRoleBadge = useCallback((role) => {
    return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';
  }, []);

  const isOwnMessage = useCallback((message) => {
    const currentUserId = user?._id;
    return message.senderId === currentUserId || 
           message.senderId?._id === currentUserId ||
           message.senderId?._id?.toString() === currentUserId;
  }, [user]);

  // Group messages by date
  const groupedMessages = React.useMemo(() => {
    const groups = [];
    let currentDate = null;
    
    messages.forEach((message, index) => {
      const messageDate = formatDate(message.createdAt);
      
      if (messageDate !== currentDate) {
        groups.push({
          type: 'date',
          content: messageDate,
          key: `date-${messageDate}`
        });
        currentDate = messageDate;
      }
      
      groups.push({
        type: 'message',
        content: message,
        key: message._id || `msg-${index}`
      });
    });
    
    return groups;
  }, [messages, formatDate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Please Sign In</h3>
          <p className="text-gray-500 mb-4">You need to be signed in to access chat</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col transition-all duration-300 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0a66c2] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Messages</h2>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-gray-500">
                        {isConnected ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleGoHome}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Go to Dashboard"
                >
                  <Home className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a66c2] mx-auto mb-2"></div>
                  <p>Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No users found</p>
                  <p className="text-sm mt-1">Try adjusting your search terms</p>
                </div>
              ) : (
                filteredUsers.map((userItem) => (
                  <div
                    key={userItem.userId}
                    onClick={() => handleUserSelect(userItem)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                      selectedUser?.userId === userItem.userId ? 'bg-blue-50 border-l-4 border-l-[#0a66c2]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={userItem.profilePicture || `https://ui-avatars.com/api/?name=${userItem.name}&background=0a66c2&color=fff`}
                          alt={userItem.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {isUserOnline(userItem.userId) && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">
                            {userItem.name}
                          </p>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getRoleColor(userItem.role)}`}>
                            {getRoleBadge(userItem.role)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{userItem.email}</p>
                        {userItem.headline && (
                          <p className="text-xs text-gray-400 mt-1 truncate">{userItem.headline}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Unread message indicator */}
                    {unreadCounts[userItem.userId] > 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {unreadCounts[userItem.userId]}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleGoBack}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="relative">
                        <img
                          src={selectedUser.profilePicture || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=0a66c2&color=fff`}
                          alt={selectedUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {isUserOnline(selectedUser.userId) && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedUser.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getRoleColor(selectedUser.role)}`}>
                            {getRoleBadge(selectedUser.role)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {isUserOnline(selectedUser.userId) ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                  {groupedMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No messages yet</p>
                        <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    groupedMessages.map((item) => {
                      if (item.type === 'date') {
                        return (
                          <div key={item.key} className="flex justify-center">
                            <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                              {item.content}
                            </div>
                          </div>
                        );
                      }
                      
                      const message = item.content;
                      const ownMessage = isOwnMessage(message);
                      
                      return (
                        <div
                          key={item.key}
                          className={`flex ${ownMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              ownMessage
                                ? 'bg-[#0a66c2] text-white rounded-br-none shadow-sm'
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none shadow-sm'
                            }`}
                          >
                            <div className="flex flex-col">
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className={`text-xs mt-1 ${
                              ownMessage ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Typing indicator */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-none">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm ml-2">
                            {typingUsers.map(u => u.senderName).join(', ')} 
                            {typingUsers.length === 1 ? ' is' : ' are'} typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleTyping}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent outline-none"
                      disabled={!selectedUser}
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || !selectedUser}
                      className="bg-[#0a66c2] text-white p-3 rounded-full hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Welcome to Chat</h3>
                  <p className="text-gray-500 max-w-md">
                    Select a user from the sidebar to start chatting. 
                    Send messages and connect with other users in real-time.
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <div className="text-center">
                      <MessageCircle className="w-8 h-8 text-[#0a66c2] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Real-time Chat</p>
                    </div>
                  </div>
                  {loading && (
                    <p className="text-sm text-blue-500 mt-4">Loading users from database...</p>
                  )}
                  {!isConnected && (
                    <p className="text-sm text-red-500 mt-4">Connecting to chat server...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;