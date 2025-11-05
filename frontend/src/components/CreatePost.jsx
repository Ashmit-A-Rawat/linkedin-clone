import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Image, Video, Calendar, FileText, X, Smile } from 'lucide-react';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      console.log('📝 Creating post with:', { 
        content: content.trim(),
        hasImage: !!image,
        token: token ? 'Present' : 'Missing'
      });

      // Convert image to base64 if present
      let imageBase64 = '';
      if (image) {
        imageBase64 = await convertToBase64(image);
        console.log('🖼️ Image converted to base64, length:', imageBase64.length);
      }

      const postData = {
        content: content.trim(),
        image: imageBase64
      };

      console.log('📤 Sending post data:', postData);

      const response = await axios.post(
        'http://localhost:5001/api/posts',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      
      console.log('✅ Post created successfully:', response.data);
      onPostCreated(response.data);
      setContent('');
      setImage(null);
      setImagePreview('');
      setIsExpanded(false);
    } catch (error) {
      console.error('💥 Error creating post:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-lg border border-[#00000014] p-3 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-2">
          <img
            src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=128`}
            alt={user?.name}
            className="w-12 h-12 rounded-full"
          />
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 text-left text-sm text-[#00000099] bg-transparent border border-[#00000029] hover:bg-[#0000000a] rounded-full px-4 py-3 transition-colors font-medium"
          >
            Start a post
          </button>
        </div>
        
        <div className="flex items-center justify-around mt-3 pt-2 border-t border-[#00000014]">
          <button 
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => fileInputRef.current?.click(), 100);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] rounded transition-colors"
          >
            <Image className="w-5 h-5 text-[#378fe9]" />
            <span>Photo</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] rounded transition-colors">
            <Video className="w-5 h-5 text-[#5f9b41]" />
            <span>Video</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] rounded transition-colors">
            <Calendar className="w-5 h-5 text-[#c37d16]" />
            <span>Event</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00000099] hover:bg-[#0000000a] rounded transition-colors">
            <FileText className="w-5 h-5 text-[#e16745]" />
            <span>Write article</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#00000014] overflow-hidden shadow-lg">
      <div className="p-4 border-b border-[#00000014]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a66c2&color=fff&size=128`}
              alt={user?.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-sm font-semibold text-[#000000e6]">{user?.name}</h3>
              <button className="flex items-center gap-1 text-xs text-[#00000099] bg-transparent border border-[#00000029] rounded px-2 py-0.5 hover:bg-[#0000000a] transition-colors">
                <span>Anyone</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setIsExpanded(false);
              setContent('');
              removeImage();
            }}
            className="p-2 hover:bg-[#0000000a] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#00000099]" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full border-none resize-none focus:outline-none text-sm text-[#000000e6] placeholder-[#00000099] min-h-[120px]"
            autoFocus
          />

          {imagePreview && (
            <div className="relative mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-96 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 transition-all shadow-md"
              >
                <X className="w-5 h-5 text-[#000000e6]" />
              </button>
            </div>
          )}
        </div>

        <div className="px-4 pb-4 flex items-center justify-between border-t border-[#00000014] pt-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-[#0000000a] rounded transition-colors"
              title="Add a photo"
            >
              <Image className="w-5 h-5 text-[#00000099]" />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              className="p-2 hover:bg-[#0000000a] rounded transition-colors"
              title="Add a video"
            >
              <Video className="w-5 h-5 text-[#00000099]" />
            </button>

            <button
              type="button"
              className="p-2 hover:bg-[#0000000a] rounded transition-colors"
              title="Add an event"
            >
              <Calendar className="w-5 h-5 text-[#00000099]" />
            </button>

            <button
              type="button"
              className="p-2 hover:bg-[#0000000a] rounded transition-colors"
              title="Add emoji"
            >
              <Smile className="w-5 h-5 text-[#00000099]" />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || (!content.trim() && !image)}
            className="bg-[#0a66c2] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;