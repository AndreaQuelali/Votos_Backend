import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  updatePost, 
  getPostById, 
  deletePost 
} from './posts.controller';

const postsRouter = Router();

// POST /api/v1/posts - Create a new post (Auth required)
postsRouter.post('/', createPost);

// GET /api/v1/posts - List posts with pagination (Public)
postsRouter.get('/', getPosts);

// GET /api/v1/posts/:id - Get post by ID (Public)
postsRouter.get('/:id', getPostById);

// PATCH /api/v1/posts/:id - Update post (Auth + Owner required)
postsRouter.patch('/:id', updatePost);

// DELETE /api/v1/posts/:id - Delete post (soft delete) (Auth + Owner/Admin required)
postsRouter.delete('/:id', deletePost);

export default postsRouter;