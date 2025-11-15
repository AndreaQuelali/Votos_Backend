import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  updatePost, 
  getPostById, 
  deletePost 
} from './posts.controller';

const postsRouter = Router();

postsRouter.post('/', createPost);
postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostById);
postsRouter.patch('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

export default postsRouter;