import {Expense} from '@prisma/client';
import React from 'react';

const ExpenseItem = ({id, description, note, amount}: Expense) => {
  return (
    <div>
      <h1>{description}</h1>
      <p>{note}</p>
      <p>{`£${amount}`}</p>
    </div>
  );
};

export default ExpenseItem;
