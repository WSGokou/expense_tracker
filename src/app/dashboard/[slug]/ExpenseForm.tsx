import Title from '@/app/components/Title';
import {trpc} from '@/utils/trpc';
import type {Expense} from '@prisma/client';
import {useSession} from 'next-auth/react';
import React, {useState} from 'react';

const ExpenseForm = ({page, expense}: {page: string; expense?: Expense}) => {
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount || 0);
  const [note, setNote] = useState(expense?.note || '');
  const session = useSession();
  const user = session?.data?.user;

  const create = trpc.expenses.create.useMutation();
  const update = trpc.expenses.update.useMutation();

  return (
    <div className='flex flex-col items-center'>
      <Title text={'Enter expense details:'} />
      <div className='flex flex-col gap-2 w-60 md:w-96'>
        <input
          type='text'
          name='description'
          value={description}
          placeholder='Description'
          className='border border-blue-200 rounded py-2 px-4'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type='number'
          name='amount'
          value={amount}
          placeholder='Amount'
          className='border border-blue-200 rounded py-2 px-4'
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        <textarea
          name='note'
          value={note}
          placeholder='Add a note for your expense (optional)'
          className='border border-blue-200 rounded py-2 px-4 h-40'
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button
          className='text-slate-50 font-medium rounded py-2 px-4 bg-blue-500'
          onClick={() => {
            page === 'add'
              ? description &&
                amount &&
                user.id &&
                create.mutate({
                  description,
                  amount,
                  note,
                  userId: Number(user.id),
                })
              : page === 'edit' &&
                expense &&
                update.mutate({
                  id: expense.id,
                  description,
                  amount,
                  note,
                });
          }}
        >
          {`${page === 'add' ? 'Add Expense' : 'Edit Expense'}`}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
