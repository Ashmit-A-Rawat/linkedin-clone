import express from 'express';
import {
  getConversation,
  sendMessage,
  markMessagesAsRead,
  getUnreadCount,
  getChatUsers
} from '../controllers/chatController.js';

const router = express.Router();

// Get conversation between two users
router.get('/conversation/:userId/:otherUserId', getConversation);

// Send a message
router.post('/send', sendMessage);

// Mark messages as read
router.post('/read', markMessagesAsRead);

// Get unread message count for a user
router.get('/unread/:userId', getUnreadCount);

// Get all users for chat
router.get('/users', getChatUsers);

export default router;