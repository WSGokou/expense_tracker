import type {Expense} from '@prisma/client';
import React from 'react';
import ExpenseView from './ExpenseView';

type Props = {
  params: {
    id: string;
  };
};

const Expense = ({params}: Props) => {
  const id = Number(params.id);

  return <ExpenseView id={id} />;
};

export default Expense;
