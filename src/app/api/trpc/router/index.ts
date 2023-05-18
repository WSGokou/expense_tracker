import {t} from '../trpc-router';
import {expenseRouter} from './expenseRouter';

export const appRouter = t.router({
  sayHi: t.procedure.query(({ctx}) => {
    return 'Hi';
  }),
  sayno: t.procedure.query(() => {
    return 'nooo';
  }),
  expenses: expenseRouter,
});

export type AppRouter = typeof appRouter;
