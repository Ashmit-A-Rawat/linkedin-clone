import React, { useState } from 'react';
import axios from 'axios';
import { ThumbsUp, MessageCircle, Repeat2, Send, MoreHorizontal, Globe, Trash2, Edit2, X } from 'lucide-react';
const backendUrl = import.meta.env.BACKEND_URL || (import.meta.env.PROD ? "" : "http://localhost:5001");


const PostCard = ({ post, currentUser, onUpdate, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editLoading, setEditLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const isLiked = post.likes.includes(currentUser._id);
  const isAuthor = post.author._id === currentUser._id;

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${backendUrl}api/posts/${post._id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      onUpdate(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendUrl}api/posts/${post._id}/comment`,
        { text: commentText.trim() },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      onUpdate(response.data);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;

    setEditLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${backendUrl}api/posts/${post._id}`,
        { content: editContent.trim() },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing post:', error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${backendUrl}api/posts/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#00000014] hover:shadow-lg transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=0a66c2&color=fff&size=128`}
              alt={post.author.name}
              className="w-12 h-12 rounded-full cursor-pointer hover:scale-105 transition-transform"
            />
            <div>
              <h3 className="text-sm font-semibold text-[#000000e6] hover:text-[#0a66c2] hover:underline cursor-pointer">
                {post.author.name}
              </h3>
              <p className="text-xs text-[#00000099]">
                {post.author.headline || 'LinkedIn Member'}
              </p>
              <div className="flex items-center gap-1 text-xs text-[#00000099] mt-0.5">
                <span>{formatTime(post.createdAt)}</span>
                <span>•</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          
          {isAuthor && (
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-1.5 hover:bg-[#0000000a] rounded-full transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-[#00000099]" />
              </button>
              
              {showOptions && (
                <div className="absolute right-0 top-8 bg-white shadow-xl border border-[#00000014] rounded-lg py-1 w-48 z-10">
                  {!isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#000000e6] hover:bg-[#0000000a] flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit post
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-3 pb-2">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border border-[#00000029] rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
              rows="4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(post.content);
                }}
                className="px-4 py-1.5 text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={editLoading || !editContent.trim()}
                className="px-4 py-1.5 text-sm font-semibold bg-[#0a66c2] text-white rounded-full hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#000000e6] whitespace-pre-wrap break-words">
            {post.content}
          </p>
        )}

        {/* Post Image */}
        {post.image && !isEditing && (
          <div className="mt-3 -mx-3">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-[500px] object-cover cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-3 py-2 flex items-center justify-between text-xs text-[#00000099]">
        <div className="flex items-center gap-2">
          {post.likes.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center">
                <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
              </div>
              <span>{post.likes.length}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {post.comments.length > 0 && (
            <button 
              onClick={() => setShowComments(!showComments)}
              className="hover:text-[#0a66c2] hover:underline"
            >
              {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>

      {/* Post Actions */}
      <div className="border-t border-[#00000014] px-2 py-1 flex items-center justify-around">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-sm font-semibold transition-colors ${
            isLiked 
              ? 'text-[#0a66c2]' 
              : 'text-[#00000099] hover:bg-[#0000000a]'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-[#0a66c2]' : ''}`} />
          <span>Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] transition-colors">
          <Repeat2 className="w-5 h-5" />
          <span>Repost</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] transition-colors">
          <Send className="w-5 h-5" />
          <span>Send</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-[#00000014] bg-[#fafafa]">
          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="flex gap-2 p-3">
            <img
              src={currentUser.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=0a66c2&color=fff&size=128`}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white border border-[#00000029] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={commentLoading || !commentText.trim()}
                className="bg-[#0a66c2] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {commentLoading ? '...' : 'Post'}
              </button>
            </div>
          </form>

          {/* Comments List */}
          {post.comments.length > 0 && (
            <div className="px-3 pb-3 space-y-3 max-h-96 overflow-y-auto">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex gap-2">
                  <img
                    src={comment.user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=0a66c2&color=fff&size=128`}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-white rounded-lg px-3 py-2 border border-[#00000014]">
                      <h4 className="text-sm font-semibold text-[#000000e6]">
                        {comment.user.name}
                      </h4>
                      <p className="text-sm text-[#000000e6] mt-1 break-words">
                        {comment.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 px-3">
                      <span className="text-xs text-[#00000099]">
                        {formatTime(comment.createdAt)}
                      </span>
                      <button className="text-xs font-semibold text-[#00000099] hover:text-[#0a66c2]">
                        Like
                      </button>
                      <button className="text-xs font-semibold text-[#00000099] hover:text-[#0a66c2]">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;