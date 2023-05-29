import React from 'react';
import {ViewExpense} from '../Expenses';

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
