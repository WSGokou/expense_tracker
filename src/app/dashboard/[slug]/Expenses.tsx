'use client';
import {trpc} from '@/utils/trpc';
import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import {useSession} from 'next-auth/react';

export const ListExpenses = () => {
  const session = useSession();
  const user = session.data?.user;
  const userId = parseInt(user?.id, 10);

  const {
    data: expenses,
    isLoading,
    isFetching,
  } = trpc.expenses.list.useQuery(userId);

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      ListExpenses
      {JSON.stringify(expenses)}
      {!expenses?.length
        ? 'No expenses'
        : expenses?.map((expense) => (
            <ExpenseItem
              key={expense.id}
              {...expense}
            />
          ))}
    </div>
  );
};

export const AddExpense = () => {
  const response = trpc.expenses.create.useMutation();
  return (
    <div>
      <ExpenseForm />
    </div>
  );
};

export const EditExpense = () => {
  return <div>Edit Expense</div>;
};
