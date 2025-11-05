import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import SearchUsers from '../components/SearchUsers';
import { 
  Briefcase, 
  Users, 
  Bookmark, 
  TrendingUp,
  Hash,
  Plus,
  Bell,
  MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get API URL from environment or default
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      const postsData = response.data.posts || response.data;
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const removePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      {/* Fixed Header with Search */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#00000014] z-50 shadow-sm">
        <div className="max-w-[1128px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-8 h-8 bg-[#0a66c2] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">in</span>
              </div>
              <span className="hidden sm:block text-xl font-semibold text-gray-900">LinkedIn</span>
            </div>

            {/* Search Bar - Takes available space */}
            <div className="flex-1 max-w-md">
              <SearchUsers />
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
              <button 
                onClick={() => navigate('/network')}
                className="flex flex-col items-center gap-0.5 text-[#00000099] hover:text-[#000000e6] transition-colors"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:block text-xs">Network</span>
              </button>
              
              <button 
                onClick={() => navigate('/jobs')}
                className="flex flex-col items-center gap-0.5 text-[#00000099] hover:text-[#000000e6] transition-colors"
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:block text-xs">Jobs</span>
              </button>

              <button 
                onClick={() => navigate('/chat')}
                className="flex flex-col items-center gap-0.5 text-[#00000099] hover:text-[#000000e6] transition-colors"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:block text-xs">Messaging</span>
              </button>
              
              <button 
                onClick={() => navigate('/notifications')}
                className="flex flex-col items-center gap-0.5 text-[#00000099] hover:text-[#000000e6] transition-colors relative"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:block text-xs">Notifications</span>
                {/* Optional notification badge */}
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile */}
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                onClick={() => navigate('/profile')}
              >
                <img
                  src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=32`}
                  alt={user?.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                />
                <span className="hidden sm:block text-sm font-medium text-[#000000e6]">Me</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Add padding top to account for fixed header */}
      <div className="pt-14">
        <div className="max-w-[1128px] mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-2">
              {/* Profile Card */}
              <div className="bg-white rounded-lg border border-[#00000014] overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Cover Photo */}
                <div className="h-14 bg-gradient-to-r from-[#0a66c2] to-[#378fe9]"></div>
                
                {/* Profile Info */}
                <div className="px-3 pb-3 -mt-8 relative">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=128`}
                      alt={user?.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => navigate('/profile')}
                    />
                    <h2 
                      className="mt-2 text-sm font-semibold text-[#000000e6] hover:underline cursor-pointer"
                      onClick={() => navigate('/profile')}
                    >
                      {user?.name}
                    </h2>
                    <p className="text-xs text-[#00000099] mt-1 px-2">
                      {user?.headline || 'Add a headline to your profile'}
                    </p>
                  </div>
                  
                  {/* Profile Stats */}
                  <div className="mt-3 pt-3 border-t border-[#00000014]">
                    <button className="w-full text-left hover:bg-[#0000000a] rounded px-2 py-1.5 transition-colors">
                      <div className="flex justify-between text-xs items-center">
                        <span className="text-[#00000099]">Profile viewers</span>
                        <span className="font-semibold text-[#0a66c2] flex items-center gap-1">
                          142
                        </span>
                      </div>
                    </button>
                    
                    <button 
                      className="w-full text-left hover:bg-[#0000000a] rounded px-2 py-1.5 transition-colors mt-1"
                      onClick={() => navigate('/network')}
                    >
                      <div className="flex justify-between text-xs items-center">
                        <span className="text-[#00000099]">Connections</span>
                        <span className="font-semibold text-[#0a66c2]">500+</span>
                      </div>
                    </button>
                  </div>

                  {/* Premium CTA */}
                  <div className="mt-3 pt-3 border-t border-[#00000014]">
                    <button className="w-full text-left hover:bg-[#0000000a] rounded px-2 py-1.5 transition-colors">
                      <p className="text-xs text-[#00000099] mb-1">
                        Strengthen your profile with AI
                      </p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                        Try Premium Free
                      </div>
                    </button>
                  </div>

                  {/* My Items */}
                  <div className="mt-3 pt-3 border-t border-[#00000014]">
                    <button className="w-full text-left hover:bg-[#0000000a] rounded px-2 py-1.5 transition-colors flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#00000099]" />
                      <span className="text-xs font-semibold text-[#000000e6]">My items</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Card */}
              <div className="bg-white rounded-lg border border-[#00000014] overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-[#000000e6]">Recent</h3>
                  </div>
                  <div className="space-y-1">
                    {['Programming', 'Web Development', 'ReactJS', 'Node.js', 'UI/UX Design'].map((topic, index) => (
                      <button 
                        key={index}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-xs text-[#00000099] hover:bg-[#0000000a] rounded transition-colors"
                      >
                        <Hash className="w-3 h-3" />
                        <span className="font-medium">{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-[#00000014] p-3">
                  <button className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-[#0a66c2] hover:bg-[#0000000a] rounded transition-colors">
                    <Plus className="w-4 h-4" />
                    Discover more
                  </button>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-6 space-y-2">
              <CreatePost onPostCreated={addPost} />
              
              {/* Sort Options */}
              <div className="bg-white rounded-lg border border-[#00000014] p-3 flex items-center justify-between">
                <span className="text-xs text-[#00000099]">Sort by:</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-semibold text-[#000000e6] bg-[#0000000a] hover:bg-[#00000014] rounded-full transition-colors">
                    Top
                  </button>
                  <button className="px-3 py-1 text-xs font-semibold text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors">
                    Recent
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-[#00000014] p-4 animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white rounded-lg border border-[#00000014] p-12 text-center">
                  <div className="text-[#00000099] text-base mb-2">No posts yet</div>
                  <p className="text-sm text-[#00000099]">Be the first to share something with your network!</p>
                </div>
              ) : (
                posts.map(post => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUser={user}
                    onUpdate={updatePost}
                    onDelete={removePost}
                  />
                ))
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-2">
              {/* LinkedIn News */}
              <div className="bg-white rounded-lg border border-[#00000014] overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-3 border-b border-[#00000014]">
                  <h3 className="text-sm font-semibold text-[#000000e6] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0a66c2]" />
                    LinkedIn News
                  </h3>
                </div>
                <div className="p-3 space-y-3">
                  {[
                    { title: 'Tech hiring trends 2024', time: '2d ago', readers: '1,234' },
                    { title: 'Remote work insights', time: '3d ago', readers: '2,456' },
                    { title: 'AI in development', time: '5d ago', readers: '3,789' },
                    { title: 'Startup funding news', time: '1w ago', readers: '4,123' },
                    { title: 'Career growth tips', time: '1w ago', readers: '5,678' }
                  ].map((news, index) => (
                    <button 
                      key={index}
                      className="w-full text-left hover:bg-[#0000000a] rounded p-2 transition-colors"
                    >
                      <div className="text-xs font-semibold text-[#000000e6] mb-1">
                        • {news.title}
                      </div>
                      <div className="text-xs text-[#00000099]">
                        {news.time} • {news.readers} readers
                      </div>
                    </button>
                  ))}
                </div>
                <button className="w-full p-3 text-xs font-semibold text-[#00000099] hover:bg-[#0000000a] text-left border-t border-[#00000014] transition-colors">
                  Show more →
                </button>
              </div>

              {/* Today's Courses */}
              <div className="bg-white rounded-lg border border-[#00000014] overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-3 border-b border-[#00000014]">
                  <h3 className="text-sm font-semibold text-[#000000e6] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#0a66c2]" />
                    Today's Courses
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {[
                    'Advanced React Patterns',
                    'Node.js Best Practices',
                    'System Design Fundamentals'
                  ].map((course, index) => (
                    <button 
                      key={index}
                      className="w-full text-left text-xs text-[#0a66c2] font-semibold hover:underline p-2 hover:bg-[#0000000a] rounded transition-colors"
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="text-center text-xs text-[#00000099] space-y-2 px-3 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">About</a>
                  <span>·</span>
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">Accessibility</a>
                  <span>·</span>
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">Help Center</a>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">Privacy</a>
                  <span>·</span>
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">Terms</a>
                  <span>·</span>
                  <a href="#" className="hover:text-[#0a66c2] hover:underline">Settings</a>
                </div>
                <p className="mt-3">LinkedIn Clone © 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;