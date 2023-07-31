import { Injectable } from '@nestjs/common';
import {
  LoginAndPasswordRequiredException,
  InvalidOldPasswordException,
  InvalidDataException,
} from '../utils/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';
import { User } from '../types/usersInterface';
import USERS_DB from 'src/db/users.db';
import getValidUuid from 'src/utils/checkValidation';
import { checkUserExist } from 'src/utils/checkExist';
import { findUser } from 'src/utils/checkAppropriate';
import { deleteAppropriateUser } from 'src/utils/deleteAppropriate';

@Injectable()
export class UsersService {
  private setUserWithoutPassword({
    password,
    ...userWithoutPassword
  }: User): Omit<User, 'password'> {
    return userWithoutPassword;
  }

  private checkLoginPassword(login: string, password: string): void {
    if (!login || !password) {
      throw new LoginAndPasswordRequiredException();
    }
  }

  private checkOldNewPassword(oldPassword: string, newPassword: string): void {
    if (!(oldPassword || newPassword)) {
      throw new InvalidDataException();
    }
  }

  getAllUsers(): Omit<User, 'password'>[] {
    return USERS_DB.map((user) => this.setUserWithoutPassword(user));
  }

  getUserById(id: string): Omit<User, 'password'> {
    getValidUuid(id);
    const user = findUser(id);
    checkUserExist(user);

    return this.setUserWithoutPassword(user);
  }

  createUser(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const { login, password } = createUserDto;

    this.checkLoginPassword(login, password);

    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    USERS_DB.push(newUser);
    return this.setUserWithoutPassword(newUser);
  }

  updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const { oldPassword, newPassword } = updatePasswordDto;

    getValidUuid(id);

    this.checkOldNewPassword(oldPassword, newPassword);

    const user = findUser(id);
    checkUserExist(user);

    if (user.password !== oldPassword) {
      throw new InvalidOldPasswordException();
    }
    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    const updatedUser: User = {
      ...user,
    };

    return this.setUserWithoutPassword(updatedUser);
  }

  deleteUser(id: string) {
    const user = findUser(id);

    getValidUuid(id);
    checkUserExist(user);

    deleteAppropriateUser(user);
  }
}
