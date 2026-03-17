import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser() {
    const email = 'hariharansharma588@gmail.com';
    const exists = await this.prisma.user.existsEmail(email);

    if (exists) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    return this.prisma.user.create({
      data: {
        firstName: 'Sri Hari Haran',
        lastName: 'Sharma',
        email,
        role: 'Admin',
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async deleteUser(userId: string) {
    return this.prisma.user.softDelete(userId);
  }
}
