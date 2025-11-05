import Message from '../models/Message.js';

const onlineUsers = new Map();
const typingUsers = new Map();

export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // User joins the chat
    socket.on('user_join', async (data) => {
      const { userId, userName, userRole } = data;
      
      onlineUsers.set(userId, {
        socketId: socket.id,
        userId,
        userName,
        userRole,
        joinedAt: new Date()
      });

      socket.userId = userId;
      
      console.log('👤 User joined chat:', { userId, userName, socketId: socket.id });
      
      // Broadcast updated online users list
      io.emit('online_users_update', {
        onlineUsers: Array.from(onlineUsers.values())
      });
    });

    // Get conversation between users
    socket.on('get_conversation', async (data) => {
      try {
        const { otherUserId } = data;
        
        const messages = await Message.find({
          $or: [
            { senderId: socket.userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: socket.userId }
          ]
        })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('senderId', 'name email profilePicture headline')
        .populate('receiverId', 'name email profilePicture headline');

        const sortedMessages = messages.reverse();

        socket.emit('conversation_data', {
          messages: sortedMessages
        });
      } catch (error) {
        console.error('Error fetching conversation:', error);
        socket.emit('conversation_error', {
          message: 'Failed to load conversation'
        });
      }
    });

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content } = data;
        
        if (!socket.userId) {
          socket.emit('message_error', { message: 'User not authenticated' });
          return;
        }

        const message = new Message({
          senderId: socket.userId,
          receiverId,
          content: content.trim()
        });

        await message.save();

        // Populate the message
        const populatedMessage = await Message.findById(message._id)
          .populate('senderId', 'name email profilePicture headline')
          .populate('receiverId', 'name email profilePicture headline');

        // Send to sender
        socket.emit('message_sent', {
          message: populatedMessage
        });

        // Send to receiver if online
        const receiver = onlineUsers.get(receiverId);
        if (receiver) {
          io.to(receiver.socketId).emit('receive_message', {
            message: populatedMessage
          });
        }

        console.log('📨 Message sent:', {
          from: socket.userId,
          to: receiverId,
          content: content.substring(0, 50) + '...'
        });

      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', {
          message: 'Failed to send message'
        });
      }
    });

    // Typing indicators
    socket.on('typing_start', (data) => {
      const { receiverId } = data;
      
      typingUsers.set(socket.userId, {
        senderId: socket.userId,
        senderName: onlineUsers.get(socket.userId)?.userName || 'User',
        receiverId,
        startedAt: new Date()
      });

      const receiver = onlineUsers.get(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit('user_typing', {
          senderId: socket.userId,
          senderName: onlineUsers.get(socket.userId)?.userName || 'User'
        });
      }
    });

    socket.on('typing_stop', (data) => {
      const { receiverId } = data;
      
      typingUsers.delete(socket.userId);

      const receiver = onlineUsers.get(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit('user_stop_typing', {
          senderId: socket.userId
        });
      }
    });

    // Mark messages as read
    socket.on('mark_messages_read', async (data) => {
      try {
        const { senderId } = data;
        
        await Message.updateMany(
          {
            senderId: senderId,
            receiverId: socket.userId,
            isRead: false
          },
          {
            $set: {
              isRead: true,
              readAt: new Date()
            }
          }
        );

        // Notify the sender that messages were read
        const sender = onlineUsers.get(senderId);
        if (sender) {
          io.to(sender.socketId).emit('messages_read', {
            readerId: socket.userId,
            readerName: onlineUsers.get(socket.userId)?.userName || 'User'
          });
        }

      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('🔌 User disconnected:', socket.id);
      
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        typingUsers.delete(socket.userId);
        
        // Broadcast updated online users list
        io.emit('online_users_update', {
          onlineUsers: Array.from(onlineUsers.values())
        });
      }
    });

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};

export { onlineUsers, typingUsers };