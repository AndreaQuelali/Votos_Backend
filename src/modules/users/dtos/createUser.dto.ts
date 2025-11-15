import { IUser } from '../interfaces/users.interface';

export type ICreateUser = Omit<IUser, 'id'>