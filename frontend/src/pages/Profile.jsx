import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Award, 
  BookOpen, 
  Save,
  Edit3,
  X,
  Plus,
  Trash2,
  Camera
} from 'lucide-react';
const backendUrl = import.meta.env.BACKEND_URL || (import.meta.env.PROD ? "" : "http://localhost:5001");


const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    headline: '',
    industry: '',
    location: '',
    bio: '',
    experienceLevel: '',
    skills: [],
    profilePicture: ''
  });

  // Experience level options
  const experienceLevels = [
    'Student',
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive',
    'Founder'
  ];

  // Popular industries
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Marketing',
    'Sales',
    'Design',
    'Engineering',
    'Product Management',
    'Consulting',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Other'
  ];

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        headline: user.headline || '',
        industry: user.industry || '',
        location: user.location || '',
        bio: user.bio || '',
        experienceLevel: user.experienceLevel || '',
        skills: user.skills || [],
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      console.log('💾 Saving profile data:', profileData);
      
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        '${backendUrl}api/users/profile',
        profileData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log('✅ Profile update response:', response.data);

      if (response.data.success) {
        // Update the user context with new data
        updateUser(response.data.user);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original user data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      headline: user.headline || '',
      industry: user.industry || '',
      location: user.location || '',
      bio: user.bio || '',
      experienceLevel: user.experienceLevel || '',
      skills: user.skills || [],
      profilePicture: user.profilePicture || ''
    });
    setIsEditing(false);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, we'll just update the URL - in a real app you'd upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    const totalFields = 7; // name, headline, industry, location, bio, experienceLevel, skills
    
    if (profileData.name && profileData.name !== user?.name) completed++;
    if (profileData.headline) completed++;
    if (profileData.industry) completed++;
    if (profileData.location) completed++;
    if (profileData.bio) completed++;
    if (profileData.experienceLevel) completed++;
    if (profileData.skills.length > 0) completed++;
    
    return Math.round((completed / totalFields) * 100);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a66c2] mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#00000014] p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profileData.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=0a66c2&color=fff&size=128`}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-[#0a66c2] text-white p-2 rounded-full cursor-pointer hover:bg-[#004182] transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-[#000000e6] border-b border-gray-300 focus:border-[#0a66c2] focus:outline-none pb-1 w-full"
                      placeholder="Your Name"
                    />
                    <input
                      type="text"
                      name="headline"
                      value={profileData.headline}
                      onChange={handleInputChange}
                      className="text-lg text-[#00000099] border-b border-gray-300 focus:border-[#0a66c2] focus:outline-none pb-1 w-full"
                      placeholder="Your Headline (e.g., Software Engineer at Company)"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-[#000000e6]">{profileData.name}</h1>
                    <p className="text-lg text-[#00000099] mt-1">
                      {profileData.headline || 'Add a headline to your profile'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-[#00000099]">
                      {profileData.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{profileData.location}</span>
                        </span>
                      )}
                      {profileData.industry && (
                        <span className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{profileData.industry}</span>
                        </span>
                      )}
                      {profileData.experienceLevel && (
                        <span className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{profileData.experienceLevel}</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm font-semibold text-[#00000099] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[#0a66c20a] transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg border border-[#00000014] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#000000e6] flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>About</span>
                </h2>
              </div>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                  maxLength="500"
                />
              ) : (
                <p className="text-[#00000099] leading-relaxed">
                  {profileData.bio || 'Add a bio to tell people more about yourself.'}
                </p>
              )}
              {isEditing && (
                <p className="text-xs text-[#00000099] mt-2 text-right">
                  {profileData.bio.length}/500 characters
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg border border-[#00000014] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#000000e6] flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Skills</span>
                </h2>
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add a skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182] transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-[#0a66c20a] text-[#0a66c2] px-3 py-1 rounded-full flex items-center space-x-2"
                      >
                        <span className="text-sm font-medium">{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-[#0a66c2] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#0a66c20a] text-[#0a66c2] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-[#00000099]">No skills added yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-[#00000014] p-6">
              <h3 className="font-semibold text-[#000000e6] mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#00000099]">Email</p>
                  <p className="text-[#000000e6] font-medium">{profileData.email}</p>
                </div>
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm text-[#00000099] mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[#00000099] mb-1">Industry</label>
                      <select
                        name="industry"
                        value={profileData.industry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                      >
                        <option value="">Select Industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[#00000099] mb-1">Experience Level</label>
                      <select
                        name="experienceLevel"
                        value={profileData.experienceLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                      >
                        <option value="">Select Experience Level</option>
                        {experienceLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    {profileData.location && (
                      <div>
                        <p className="text-sm text-[#00000099]">Location</p>
                        <p className="text-[#000000e6] font-medium">{profileData.location}</p>
                      </div>
                    )}
                    {profileData.industry && (
                      <div>
                        <p className="text-sm text-[#00000099]">Industry</p>
                        <p className="text-[#000000e6] font-medium">{profileData.industry}</p>
                      </div>
                    )}
                    {profileData.experienceLevel && (
                      <div>
                        <p className="text-sm text-[#00000099]">Experience Level</p>
                        <p className="text-[#000000e6] font-medium">{profileData.experienceLevel}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-lg border border-[#00000014] p-6">
              <h3 className="font-semibold text-[#000000e6] mb-3">Profile Strength</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-[#0a66c2] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProfileCompletion()}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#00000099]">
                {calculateProfileCompletion()}% complete
              </p>
              <p className="text-xs text-[#00000099] mt-1">
                Complete your profile to increase visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;