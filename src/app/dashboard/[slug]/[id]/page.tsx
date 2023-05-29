'use client';
import {trpc} from '@/utils/trpc';
import type {Expense} from '@prisma/client';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const Expense = ({params}: Props) => {
  const id = Number(params.id);

  const {data: expense} = trpc.expenses.getById.useQuery({id});

  return (
    <div>
      {/* {JSON.stringify(expense)} */}
      <h1>{expense?.description}</h1>
      <p>{expense?.note}</p>
      <p>{`£${expense?.amount}`}</p>
    </div>
  );
};

export default Expense;
