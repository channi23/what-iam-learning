import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

const createExtendedClient = () => {
  const baseClient = new PrismaClient({
    adapter: new PrismaLibSql({
      url: process.env.DATABASE_URL ?? 'file:./dev.db',
    }),
  });

  return baseClient.$extends(
    {
      query: {
        user: {
          async findUnique({ args }) {
            return baseClient.user.findFirst({
              where: { ...args.where, deleted: false } as any,
            });
          },
          async findMany({ args, query }) {
            return query({
              ...args,
              where: { ...args?.where, deleted: false } as any,
            });
          },
          async delete({ args }) {
            return baseClient.user.update({
              where: args.where,
              data: { deleted: true } as any,
            });
          },
        },
      },
    },
  );
};

const ExtendedPrismaClient: any = class {
  constructor() {
    return createExtendedClient();
  }
};

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleDestroy, OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
