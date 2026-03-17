import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private users: UserService) {}

  @Get('test')
  async test() {
    return this.users.createUser();
  }

  @Get()
  async getUsers() {
    return this.users.getUsers();
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.users.deleteUser(userId);
  }
}
