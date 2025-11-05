import express from 'express';
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, addComment);
router.route('/:id').delete(protect, deletePost);

export default router;