import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from "./posts.service";
import { IPostFilter, PostStatus } from "./interfaces/posts.interface";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    if (!data.title || !data.content) {
      res.status(400).send({
        message: 'Missing required fields: title, content',
        status: 400,
        ok: false,
      });
      return;
    }

    if (data.title.length > 255) {
      res.status(400).send({
        message: 'Title must be at most 255 characters long',
        status: 400,
        ok: false,
      });
      return;
    }

    if (data.content.length > 10000) {
      res.status(400).send({
        message: 'Content must be at most 10,000 characters long',
        status: 400,
        ok: false,
      });
      return;
    }

    const userId = req.user?.id || data.userId;
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await createPostService({
      title: data.title,
      content: data.content,
      userId
    });

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(201).send({
      message: 'Post created successfully',
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    
    const filter: IPostFilter = {};
    
    if (query.status && typeof query.status === 'string') {
      if (Object.values(PostStatus).includes(query.status as PostStatus)) {
        filter.status = query.status as PostStatus;
        }
    }
    
    if (query.userId && typeof query.userId === 'string') {
      const userId = Number(query.userId);
      if (!isNaN(userId) && userId > 0) {
        filter.userId = userId;
      }
    }
    
    if (query.sort && typeof query.sort === 'string') {
      if (query.sort === 'recent' || query.sort === 'popular') {
        filter.sort = query.sort;
      }
    }
    
    if (query.page && typeof query.page === 'string') {
      const page = Number(query.page);
      if (!isNaN(page) && page > 0) {
        filter.page = page;
      }
    }
    
    if (query.limit && typeof query.limit === 'string') {
      const limit = Number(query.limit);
      if (!isNaN(limit) && limit > 0 && limit <= 50) {
        filter.limit = limit;
      }
    }

    const result = await getPostsService(filter);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid post id',
        status: 400,
        ok: false,
      });
      return;
    }
    
    const result = await getPostByIdService(numericId);

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Post not found',
        status: 400,
        ok: false,
      });
      return;
    }

    if (data.title && data.title.length > 255) {
      res.status(400).send({
        message: 'Title must be at most 255 characters long',
        status: 400,
        ok: false,
      });
      return;
    }

    if (data.content && data.content.length > 10000) {
      res.status(400).send({
        message: 'The content must be at most 10,000 characters long',
        status: 400,
        ok: false,
      });
      return;
    }

    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await updatePostService(numericId, data, userId);

    if (!result.ok) {
      const statusCode = result.message.includes('No autorizado') ? 403 : 400;
      res.status(statusCode).send({
        message: result.message,
        status: statusCode,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id;
    
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(404).send({
        message: 'Post not found',
        status: 404,
        ok: false,
      });
      return;
    }

    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'super_admin';
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await deletePostService(numericId, userId, isAdmin);

    if (!result.ok) {
      const statusCode = result.message.includes('Unauthorized') ? 403 : 404;
      res.status(statusCode).send({
        message: result.message,
        status: statusCode,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}