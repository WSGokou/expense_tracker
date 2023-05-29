import {prisma} from '@/utils/prisma';
import {t} from '../trpc-router';
import {z} from 'zod';
import {TRPCError} from '@trpc/server';

export const expenseRouter = t.router({
  getById: t.procedure
    .input(z.object({id: z.number()}))
    .query(async ({input}) => {
      const expense = await prisma.expense.findUnique({where: {id: input.id}});

      if (!expense) throw new TRPCError({code: 'NOT_FOUND'});

      return expense;
    }),

  getAll: t.procedure.input(z.number()).query(({input}) => {
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
    .mutation(async ({input}) => {
      const {description, note, amount, userId} = input;
      const expense = await prisma.expense.create({
        data: {
          description,
          note,
          amount,
          userId,
        },
      });

      return expense;
    }),
});
