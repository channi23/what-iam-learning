import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';
import {
  existsEmail,
  fullNameExtension,
  hideDeletedUsers,
  softDelete,
} from './prisma.extension';

const createPrismaClient = (connectionString: string) => {
  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({ adapter })
    .$extends(fullNameExtension)
    .$extends(existsEmail)
    .$extends(hideDeletedUsers)
    .$extends(softDelete);
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: ExtendedPrismaClient;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }

    this.client = createPrismaClient(process.env.DATABASE_URL);
  }

  get user() {
    return this.client.user;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
