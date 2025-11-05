import User from '../models/User.js';
import mongoose from 'mongoose';

// @desc    Search users
// @route   GET /api/users/search
// @access  Public
export const searchUsers = async (req, res) => {
  try {
    const { q, filter = 'all', page = 1, limit = 10 } = req.query;
    
    console.log('🔍 Search request:', { q, filter, page, limit });
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchQuery = q.trim();
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search conditions based on filter
    let searchConditions = {};
    const searchRegex = new RegExp(searchQuery, 'i');

    switch (filter) {
      case 'people':
        searchConditions = {
          $or: [
            { name: { $regex: searchRegex } },
            { headline: { $regex: searchRegex } }
          ]
        };
        break;
      
      case 'skills':
        // FIXED: Use $elemMatch for array fields with regex
        searchConditions = {
          skills: { $elemMatch: { $regex: searchRegex } }
        };
        break;
      
      case 'companies':
        searchConditions = {
          $or: [
            { industry: { $regex: searchRegex } },
            { headline: { $regex: searchRegex } }
          ]
        };
        break;
      
      case 'all':
      default:
        searchConditions = {
          $or: [
            { name: { $regex: searchRegex } },
            { headline: { $regex: searchRegex } },
            { industry: { $regex: searchRegex } },
            { skills: { $elemMatch: { $regex: searchRegex } } }, // FIXED
            { bio: { $regex: searchRegex } }
          ]
        };
        break;
    }

    console.log('📋 Search conditions:', JSON.stringify(searchConditions, null, 2));

    // Execute search with pagination
    const [users, totalCount] = await Promise.all([
      User.find(searchConditions)
        .select('name email profilePicture headline industry skills bio experienceLevel location')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      User.countDocuments(searchConditions)
    ]);

    console.log(`✅ Found ${users.length} users (total: ${totalCount})`);

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: totalCount,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      },
      searchInfo: {
        query: searchQuery,
        filter,
        resultsCount: users.length
      }
    });

  } catch (error) {
    console.error('❌ Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during search',
      error: error.message
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const user = await User.findById(id)
      .select('-password -__v')
      .populate('connections', 'name profilePicture headline');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
      error: error.message
    });
  }
};

// @desc    Get users by skill
// @route   GET /api/users/skills/:skill
// @access  Public
export const getUsersBySkill = async (req, res) => {
  try {
    const { skill } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const skillRegex = new RegExp(skill, 'i');

    const [users, totalCount] = await Promise.all([
      User.find({ skills: { $elemMatch: { $regex: skillRegex } } }) // FIXED
        .select('name profilePicture headline industry skills')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      User.countDocuments({ skills: { $elemMatch: { $regex: skillRegex } } }) // FIXED
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: totalCount,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      },
      skill: skill
    });

  } catch (error) {
    console.error('Get users by skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users by skill',
      error: error.message
    });
  }
};

// @desc    Get suggested users (for connections)
// @route   GET /api/users/suggestions
// @access  Private
export const getSuggestedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { limit = 5 } = req.query;

    const limitNum = parseInt(limit);

    // Get users not connected to current user and not the current user themselves
    const suggestedUsers = await User.find({
      _id: { $ne: currentUserId },
      connections: { $ne: currentUserId }
    })
      .select('name profilePicture headline industry')
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      users: suggestedUsers,
      count: suggestedUsers.length
    });

  } catch (error) {
    console.error('Get suggested users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching suggested users',
      error: error.message
    });
  }
};

// @desc    Get users by industry
// @route   GET /api/users/industry/:industry
// @access  Public
export const getUsersByIndustry = async (req, res) => {
  try {
    const { industry } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const industryRegex = new RegExp(industry, 'i');

    const [users, totalCount] = await Promise.all([
      User.find({ industry: { $regex: industryRegex } })
        .select('name profilePicture headline industry skills')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      User.countDocuments({ industry: { $regex: industryRegex } })
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: totalCount,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      },
      industry: industry
    });

  } catch (error) {
    console.error('Get users by industry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users by industry',
      error: error.message
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      headline,
      industry,
      location,
      bio,
      experienceLevel,
      skills,
      profilePicture
    } = req.body;

    console.log('📝 Updating profile for user:', userId);
    console.log('📦 Update data:', req.body);

    // Build update object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (headline !== undefined) updateData.headline = headline;
    if (industry !== undefined) updateData.industry = industry;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (experienceLevel !== undefined) updateData.experienceLevel = experienceLevel;
    if (skills !== undefined) updateData.skills = skills;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { 
        new: true,
        runValidators: true
      }
    ).select('-password -__v');

    if (!updatedUser) {
      console.log('❌ User not found:', userId);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile updated successfully for user:', updatedUser.name);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('💥 Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
      error: error.message
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile/me
// @access  Private
export const getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select('-password -__v')
      .populate('connections', 'name profilePicture headline');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get current user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: error.message
    });
  }
};