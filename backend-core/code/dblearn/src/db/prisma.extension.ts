import { Prisma } from '@prisma/client/extension';

export const fullNameExtension = Prisma.defineExtension({
  result: {
    user: {
      fullName: {
        needs: {
          firstName: true,
          lastName: true,
        },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
  },
});

export const existsEmail = Prisma.defineExtension({
  model: {
    user: {
      async existsEmail(email: string) {
        const count = await this.count({
          where: { email },
        });

        return count > 0;
      },
    },
  },
});

export const softDelete = Prisma.defineExtension({
  model: {
    user: {
      async softDelete(userId: string) {
        return this.update({
          where: { id: userId },
          data: {
            deleted: true,
          },
        });
      },
    },
  },
});

export const hideDeletedUsers = Prisma.defineExtension({
  query: {
    user: {
      async findMany({ args, query }) {
        const where = (args.where ?? {}) as Record<string, unknown>;

        args.where = {
          ...where,
          deleted: false,
        };

        return query(args);
      },
      async findFirst({ args, query }) {
        const where = (args.where ?? {}) as Record<string, unknown>;

        args.where = {
          ...where,
          deleted: false,
        };

        return query(args);
      },
    },
  },
});
