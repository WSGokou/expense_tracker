import {t} from '../trpc-router';
import {expenseRouter} from './expenseRouter';

export const appRouter = t.router({
  expenses: expenseRouter,
});

export type AppRouter = typeof appRouter;
