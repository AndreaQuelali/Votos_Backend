import Post from "./models/posts.model";
import User from "../users/models/users.model";
import { Op } from "sequelize";

import { ICreatePost } from "./dtos/createPost.dto";
import { IUpdatePost } from "./dtos/updatePost.dto";

import { IPostFilter, IPost, IPostWithAuthor, IPaginationMeta, PostStatus } from "./interfaces/posts.interface";

import { IServiceResponse } from "../../types";
import sequelize from "../../config/database.config";

export const createPostService = async (payload: ICreatePost): Promise<IServiceResponse<IPost>> => {
  try {
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return {
        message: 'User not found',
        ok: false,
      }
    }

    const post = await Post.create(payload);
  
    return {
      message: 'Post creado exitosamente',
      ok: true,
      data: post.dataValues
    }
  } catch (error) {
    console.error('Error in createPostService:', error);
    return {
      message: 'Error al crear el post',
      ok: false,
    }
  }
}

export const getPostsService = async (filter: IPostFilter): Promise<IServiceResponse<{ posts: IPostWithAuthor[], meta: IPaginationMeta }>> => {
  try {
    const page = filter.page || 1;
    const limit = Math.min(filter.limit || 10, 50); 
    const offset = (page - 1) * limit;

    const whereConditions: any = {};
    whereConditions.status = filter.status || PostStatus.ACTIVE;
    
    if (filter.userId) {
      whereConditions.userId = filter.userId;
    }

    let orderBy: any[] = [];
    if (filter.sort === 'popular') {
      orderBy = [['totalVotes', 'DESC'], ['createdAt', 'DESC']];
    } else {
      orderBy = [['createdAt', 'DESC']];
    }

    const { count, rows } = await Post.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: orderBy,
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    const meta: IPaginationMeta = {
      page,
      limit,
      total: count,
      totalPages
    };

    return {
      message: 'Posts obtenidos exitosamente',
      ok: true,
      data: {
        posts: rows as IPostWithAuthor[],
        meta
      }
    }
  } catch (error) {
    console.error('Error in getPostsService:', error)
    return {
      message: 'Error al obtener los posts',
      ok: false,
    }
  }
}

export const getPostByIdService = async (id: number): Promise<IServiceResponse<IPostWithAuthor>> => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    
    if (!post) {
      return {
        message: 'Post no encontrado',
        ok: false,
      }
    }
    
    return {
      message: 'Post obtenido exitosamente',
      ok: true,
      data: post as IPostWithAuthor,
    }
  } catch (error) {
    console.error('Error in getPostByIdService:', error)
    return {
      message: 'Error al obtener el post',
      ok: false,
    }
  }
}

export const updatePostService = async (id: number, payload: IUpdatePost, userId: number): Promise<IServiceResponse<number>> => {
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return {
        message: 'Post no encontrado',
        ok: false,
      }
    }

    if (post.userId !== userId) {
      return {
        message: 'No autorizado: Solo puedes actualizar tus propios posts',
        ok: false,
      }
    }

    const response = await Post.update(payload, {
      where: {
        id,
        userId // Double check ownership
      }
    });
    
    if (response[0] === 0) {
      return {
        message: 'Post no encontrado o no autorizado',
        ok: false,
      }
    }

    return {
      message: 'Post actualizado exitosamente',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error in updatePostService:', error)
    return {
      message: 'Error al actualizar el post',
      ok: false,
    }
  }
}

export const deletePostService = async (id: number, userId: number, isAdmin: boolean = false): Promise<IServiceResponse<number>> => {
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return {
        message: 'Post no encontrado',
        ok: false,  
      }
    }
    if (post.userId !== userId && !isAdmin) {
      return {
        message: 'No autorizado: Solo puedes eliminar tus propios posts',
        ok: false,
      }
    }

    // Soft delete by changing status to DELETED
    const response = await Post.update(
      { status: PostStatus.DELETED },
      {
        where: {
          id,
          ...(isAdmin ? {} : { userId }) // Admin can delete any post, users only their own
        }
      }
    );

    if (response[0] === 0) {
      return {
        message: 'Post no encontrado o no autorizado',
        ok: false,
      }
    }

    return {
      message: 'Post eliminado exitosamente',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error in deletePostService:', error)
    return {
      message: 'Error al eliminar el post',
      ok: false,
    }
  }
}