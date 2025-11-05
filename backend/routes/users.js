import express from 'express';
import {
  searchUsers,
  getUserById,
  getUsersBySkill,
  getSuggestedUsers,
  getUsersByIndustry,
  updateUserProfile,
  getCurrentUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// IMPORTANT: More specific routes MUST come before generic routes like /:id
// Protected routes (require authentication) - place these first
router.get('/profile/me', protect, getCurrentUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/suggestions/connections', protect, getSuggestedUsers);

// Public search and filter routes
router.get('/search', searchUsers);
router.get('/skills/:skill', getUsersBySkill);
router.get('/industry/:industry', getUsersByIndustry);

// Generic ID route - MUST be last to avoid matching specific routes
router.get('/:id', getUserById);

// Debug logging
console.log('✅ User routes loaded:');
console.log('   PUT /api/users/profile (protected)');
console.log('   GET /api/users/profile/me (protected)');
console.log('   GET /api/users/:id (public)');

export default router;