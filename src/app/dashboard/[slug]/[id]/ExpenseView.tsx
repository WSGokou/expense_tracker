import {trpc} from '@/utils/trpc';
import React from 'react';

const ExpenseView = ({id}: {id: number}) => {
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

export default ExpenseView;
