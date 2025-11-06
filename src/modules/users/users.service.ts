import User from "./models/users.model";
import { Op } from "sequelize";
import { ICreateUser } from "./dtos/createUser.dto";
import { IUpdateUser } from "./dtos/updateUser.dto";
import { IUserFilter, IUser } from "./interfaces/users.interface";
import { IServiceResponse } from "../../types";

export const createUserService = async (payload: ICreateUser): Promise<IServiceResponse<IUser>> => {
  try {
    const existingUser = await User.findOne({
      where: { email: payload.email }
    });

    if (existingUser) {
      return {
        message: 'Email esta en uso',
        ok: false,
      }
    }

    const user = await User.create(payload);
  
    return {
      message: 'Usuario creado exitosamente',
      ok: true,
      data: user.dataValues
    }
  } catch (error) {
    console.error('Error creando usuario:', error);
    return {
      message: 'Error creando usuario',
      ok: false,
    }
  }
}

export const getUserProfileService = async (id: string): Promise<IServiceResponse<User | null>> => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        message: 'No se encontro el usuario',
        ok: false,
      };
    }


    return {
      message: 'Perfil del usuario',
      ok: true,
      data: user,
    }
  } catch (error) {
    console.error('Error obteniendo perfil del usuario:', error)
    return {
      message: 'Error obteniendo perfil del usuario',
      ok: false,
    }
  }
}

export const getUsersService = async (filter: IUserFilter): Promise<IServiceResponse<User[]>> => {
  try {
    const whereConditions: any = {};
    
    if (filter.firstName) {
      whereConditions.firstName = {
        [Op.iLike]: `%${filter.firstName}%`
      };
    }
    
    if (filter.lastName) {
      whereConditions.lastName = {
        [Op.iLike]: `%${filter.lastName}%`
      };
    }
    
    if (filter.email) {
      whereConditions.email = {
        [Op.iLike]: `%${filter.email}%`
      };
    }
    
    if (filter.role) {
      whereConditions.role = filter.role;
    }
    
    if (filter.country) {
      whereConditions.country = {
        [Op.iLike]: `%${filter.country}%`
      };
    }
    
    if (filter.city) {
      whereConditions.city = {
        [Op.iLike]: `%${filter.city}%`
      };
    }

    const users = await User.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100 // Limitar resultados para evitar sobrecarga
    });

    return {
      message: 'Usuarios obtenidos exitosamente',
      ok: true,
      data: users,
    }
  } catch (error) {
    console.error('Error obteniendo usuarios:', error)
    return {
      message: 'Error obteniendo usuarios',
      ok: false,
    }
  }
}

export const getUserByIdService = async (id: string): Promise<IServiceResponse<IUser>> => {
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return {
        message: 'No se encontro el usuario',
        ok: false,
      }
    }
    
    return {
      message: 'Usuario obtenido exitosamente',
      ok: true,
      data: user.dataValues,
    }
  } catch (error) {
    console.error('Error obteniendo usuario:', error)
    return {
      message: 'Error obteniendo usuario',
      ok: false,
    }
  }
}

export const updateUserService = async (id: string, payload: IUpdateUser): Promise<IServiceResponse<number>> => {
  try {
    if (payload.email) {
      const existingUser = await User.findOne({
        where: { 
          email: payload.email,
          id: { [Op.ne]: id }
        }
      });

      if (existingUser) {
        return {
          message: 'Email ya esta en uso',
          ok: false,
        }
      }
    }

    const response = await User.update(payload, {
      where: {
        id,
      }
    });
    
    if (response[0] === 0) {
      return {
        message: 'No se encontro el usuario',
        ok: false,
      }
    }

    return {
      message: 'Usuario actualizado exitosamente',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error actualizando usuario:', error)
    return {
      message: 'Error actualizando usuario',
      ok: false,
    }
  }
}

export const deleteUserService = async (id: string): Promise<IServiceResponse<number>> => {
  try {
    const response = await User.destroy({
      where: {
        id,
      },
    });

    if (response === 0) {
      return {
        message: 'No se encontro el usuario',
        ok: false,
      }
    }

    return {
      message: 'Usuario eliminado exitosamente',
      ok: true,
      data: response,
    }
  } catch (error) {
    console.error('Error eliminando usuario:', error)
    return {
      message: 'Error eliminando usuario',
      ok: false,
    }
  }
}