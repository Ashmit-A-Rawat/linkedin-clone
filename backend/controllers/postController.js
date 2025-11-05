import Post from '../models/Post.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

export const createPost = async (req, res) => {
  try {
    console.log('📝 Create post request received:', {
      content: req.body.content,
      hasImage: !!req.body.image,
      user: req.user?._id
    });

    const { content, image } = req.body;
    
    if (!content && !image) {
      return res.status(400).json({ 
        message: 'Post must have either content or image' 
      });
    }

    let imageUrl = '';
    
    // If image is provided as base64, upload to Cloudinary
    if (image && image.startsWith('data:image')) {
      console.log('🖼️ Uploading image to Cloudinary...');
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: 'linkedin-clone/posts'
        });
        imageUrl = uploadResponse.secure_url;
        console.log('✅ Image uploaded to Cloudinary:', imageUrl);
      } catch (uploadError) {
        console.error('❌ Cloudinary upload error:', uploadError);
        return res.status(400).json({ 
          message: 'Failed to upload image',
          error: uploadError.message 
        });
      }
    } else if (image) {
      imageUrl = image; // If it's already a URL
    }
    
    const post = await Post.create({
      content: content || '',
      image: imageUrl,
      author: req.user._id
    });

    console.log('✅ Post created in database:', post._id);

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name profilePicture headline');
    
    res.status(201).json(populatedPost);

  } catch (error) {
    console.error('💥 Error creating post:', error);
    res.status(400).json({ 
      message: 'Failed to create post',
      error: error.message 
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const posts = await Post.find()
      .populate('author', 'name profilePicture headline')
      .populate('comments.user', 'name profilePicture')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Post.countDocuments();
    
    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const userIdString = req.user._id.toString();
    const likeIndex = post.likes.findIndex(like => like.toString() === userIdString);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
      console.log('👎 Post unliked:', { postId: post._id, user: req.user.name });
    } else {
      // Like
      post.likes.push(req.user._id);
      console.log('👍 Post liked:', { postId: post._id, user: req.user.name });
    }
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name profilePicture headline')
      .populate('comments.user', 'name profilePicture');
    
    res.json(populatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(400).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    if (text.length > 1000) {
      return res.status(400).json({ message: 'Comment is too long (max 1000 characters)' });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      user: req.user._id,
      text: text.trim()
    });
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'name profilePicture headline')
      .populate('comments.user', 'name profilePicture');
    
    console.log('💬 Comment added:', { postId: post._id, user: req.user.name });
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    console.log('🗑️ Post deleted:', { postId: req.params.id, user: req.user.name });
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }
    
    post.content = content.trim();
    if (image !== undefined) {
      post.image = image;
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name profilePicture headline')
      .populate('comments.user', 'name profilePicture');
    
    console.log('✏️ Post updated:', { postId: post._id, user: req.user.name });
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: error.message });
  }
};