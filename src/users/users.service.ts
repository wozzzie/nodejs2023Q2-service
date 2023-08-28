import { Injectable } from '@nestjs/common';
import {
  LoginAndPasswordRequiredException,
  InvalidOldPasswordException,
  InvalidDataException,
} from '../utils/exceptions';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';
import { User } from '../types/usersInterface';
import { checkUserExist } from 'src/utils/checkExist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private setUserWithoutPassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
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

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.setUserWithoutPassword(user));
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id });
    checkUserExist(user);

    return this.setUserWithoutPassword(user);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const { login, password } = createUserDto;

    this.checkLoginPassword(login, password);

    const newUser = this.userRepository.create([
      {
        login,
        password,
        version: 1,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    ]);

    const savedUser = await this.userRepository.save(newUser[0]);
    return this.setUserWithoutPassword(savedUser);
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const { oldPassword, newPassword } = updatePasswordDto;

    this.checkOldNewPassword(oldPassword, newPassword);

    const user = await this.userRepository.findOneBy({ id });
    checkUserExist(user);

    if (user.password !== oldPassword) {
      throw new InvalidOldPasswordException();
    }
    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    const updatedUser = await this.userRepository.save(user);
    return this.setUserWithoutPassword(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);

    await this.userRepository.delete(user);
  }
}
