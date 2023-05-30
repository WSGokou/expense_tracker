import React from 'react';
import {ViewExpense} from '../ExpensesFuncs';

type Props = {
  params: {
    id: string;
  };
};

const ExpensePage = ({params}: Props) => {
  const id = Number(params.id);

  return <ViewExpense id={id} />;
};

export default ExpensePage;
