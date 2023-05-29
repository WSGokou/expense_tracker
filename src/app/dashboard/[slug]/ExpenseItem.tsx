import {Expense} from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const ExpenseItem = ({id, description, note, amount}: Expense) => {
  return (
    <Link
      href={`/dashboard/view/${id}`}
      className='flex flex-col border border-black'
    >
      <div className='flex justify-between'>
        <h1>{description}</h1>
        <p>{`£${amount}`}</p>
      </div>
      <p>{note}</p>
    </Link>
  );
};

export default ExpenseItem;
