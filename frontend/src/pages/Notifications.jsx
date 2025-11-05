import React, { useState } from 'react';
import { 
  Bell,
  Users,
  Heart,
  MessageCircle,
  Briefcase,
  Calendar,
  Award,
  Check,
  X,
  MoreHorizontal,
  Clock
} from 'lucide-react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'connection',
      title: 'New connection request',
      message: 'Sarah Johnson wants to connect with you',
      time: '5 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'like',
      title: 'Your post was liked',
      message: 'Mike Chen and 15 others liked your post about React best practices',
      time: '1 hour ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on your post',
      message: 'Emily Rodriguez commented: "Great insights! I completely agree with your approach."',
      time: '2 hours ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 4,
      type: 'job',
      title: 'Recommended job for you',
      message: 'Senior Frontend Developer at TechInnovation based on your profile',
      time: '5 hours ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 5,
      type: 'anniversary',
      title: 'Work anniversary',
      message: 'Congratulations on your 2-year work anniversary at Current Company!',
      time: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'message',
      title: 'New message',
      message: 'David Kim sent you a message: "Hey, are you available for a quick call?"',
      time: '2 days ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'connection':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-purple-500" />;
      case 'anniversary':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notif.read;
    return notif.type === activeFilter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#00000014] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#000000e6]">Notifications</h1>
                <p className="text-sm text-[#00000099] mt-1">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-semibold text-[#0a66c2] hover:bg-[#0a66c20a] rounded-full transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 border-b border-[#00000014] pb-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'connection', label: 'Connections' },
              { key: 'like', label: 'Likes' },
              { key: 'comment', label: 'Comments' },
              { key: 'job', label: 'Jobs' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-[#0a66c2] text-white'
                    : 'text-[#00000099] hover:text-[#000000e6] hover:bg-[#0000000a]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#00000014] p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! Check back later for new notifications.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border border-[#00000014] p-4 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${!notification.read ? 'text-[#000000e6]' : 'text-[#00000099]'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-[#00000099] mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-[#00000099]" />
                          <span className="text-xs text-[#00000099]">
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <span className="px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors"
                          title="Delete notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons for specific types */}
                    {notification.type === 'connection' && (
                      <div className="flex gap-2 mt-3">
                        <button className="px-4 py-1.5 text-sm font-semibold text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-colors">
                          Accept
                        </button>
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                          Ignore
                        </button>
                      </div>
                    )}

                    {notification.type === 'job' && (
                      <div className="flex gap-2 mt-3">
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors">
                          View Job
                        </button>
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-2 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;