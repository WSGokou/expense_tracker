import {Expense} from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const ExpenseItem = ({id, description, note, amount}: Expense) => {
  return (
    <Link
      href={`/dashboard/view/${id}`}
      className='flex flex-col border-4 border-blue-500 px-4 gap-2 py-2 min-h-fit rounded'
    >
      <div className='flex justify-between text-lg md:text-xl xl:text-2xl font-semibold'>
        <h1 className=''>{description}</h1>
        <p>{`£${amount}`}</p>
      </div>
      <p>{note}</p>
    </Link>
  );
};

export default ExpenseItem;
