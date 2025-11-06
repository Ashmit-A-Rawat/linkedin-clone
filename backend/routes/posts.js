import express from 'express';
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  deletePost,
  updatePost   // ✅ add this import
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id')
  .put(protect, updatePost)     // ✅ Add update route
  .delete(protect, deletePost); // existing

router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, addComment);

export default router;
