import { IRegisterDto } from './dtos/register.dto';
import { ILoginDto } from './dtos/login.dto';
import { IForgotPasswordDto } from './dtos/forgotPassword.dto';
import { IResetPasswordDto } from './dtos/resetPassword.dto';
import { IAuthResponse } from './interfaces/auth.interface';
import User from '../users/models/users.model';
import { UserRole } from '../users/interfaces/users.interface';
import { securePass } from '../../tools/crypto.tool';
import { generateAccessToken } from '../../tools/jwt.tool';

export const registerService = async (payload: IRegisterDto): Promise<IAuthResponse> => {
  try {
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) {
      return { ok: false, message: 'Email is already in use' };
    }

    const passHash = await securePass(payload.password)

    console.log(
      'passHash',passHash
    )
    if (passHash === undefined) {
      throw new Error('Ha fallado el hash de la contraseña')
    }

    const user = await User.create({
      ...payload,
      role: UserRole.USER,
      password: passHash,
    });

    return { ok: true, message: 'Registrado exitosamente', data: { id: user.id, email: user.email } };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { ok: false, message: 'Error al registrar usuario' };
  }
}

export const loginService = async (payload: ILoginDto): Promise<IAuthResponse> => {
  try {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      return {
        ok: false,
        message: 'Credenciales invalidas',
      };
    }

    const token = generateAccessToken({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      sub: user.id,
    })

    return {
      ok: true,
      message: 'Inicio de sesion exitoso',
      data: { 
        id: user.id,
        email: user.email,
        token, 
      },
    };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { ok: false, message: 'Error al iniciar sesion' };
  }
}

export const forgotPasswordService = async (_payload: IForgotPasswordDto): Promise<IAuthResponse> => {
  try {
    return { ok: true, message: 'Recuperacion de contraseña - implementacion pendiente' };
  } catch (error) {
    console.error('Error en forgotPasswordService:', error);
    return { ok: false, message: 'Error al procesar recuperacion de contraseña' };
  }
}

export const resetPasswordService = async (_payload: IResetPasswordDto): Promise<IAuthResponse> => {
  try {
    return { ok: true, message: 'Restablecimiento de contraseña - implementacion pendiente' };
  } catch (error) {
    console.error('Error en resetPasswordService:', error);
    return { ok: false, message: 'Error al restablecer contraseña' };
  }
}