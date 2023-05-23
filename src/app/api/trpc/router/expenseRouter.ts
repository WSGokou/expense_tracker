import {prisma} from '@/utils/prisma';
import {t} from '../trpc-router';
import {z} from 'zod';

export const expenseRouter = t.router({
  list: t.procedure.input(z.number()).query(({input}) => {
    const userId = input;
    return prisma.expense.findMany({
      where: {
        userId,
      },
    });
  }),

  create: t.procedure
    .input(
      z.object({
        description: z.string(),
        note: z.string(),
        amount: z.number(),
        userId: z.number(),
      }),
    )
    .mutation(({input}) => {
      const {description, note, amount, userId} = input;
      return prisma.expense.create({
        data: {
          description,
          note,
          amount,
          userId,
        },
      });
    }),
});
