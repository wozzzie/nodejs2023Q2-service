import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';
import { User } from '../types/usersInterface';

type UserWithoutPassword = Omit<User, 'password'>;

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserWithoutPassword[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserWithoutPassword> {
    const user = this.usersService.getUserById(userId);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const createdUser = this.usersService.createUser(createUserDto);
    return createdUser;
  }

  @Put(':userId')
  async updateUserPassword(
    @Param('userId') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    const updatedUser = this.usersService.updateUserPassword(
      userId,
      updatePasswordDto,
    );
    return updatedUser;
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    const deletedUser = this.usersService.deleteUser(userId);
    return deletedUser;
  }
}
