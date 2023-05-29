import {trpc} from '@/utils/trpc';
import {useSession} from 'next-auth/react';
import React, {useState} from 'react';

const ExpenseForm = ({page}: {page: string}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const session = useSession();
  const user = session?.data?.user;

  const {mutate} = trpc.expenses.create.useMutation();

  return (
    <div>
      <input
        type='text'
        name='description'
        value={description}
        placeholder='Description'
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type='number'
        name='amount'
        value={amount}
        placeholder='Amount'
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <textarea
        name='note'
        value={note}
        placeholder='Add a note for your expense (optional)'
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
      <button
        onClick={() => {
          page === 'add';
          description &&
            amount &&
            user.id &&
            mutate({
              description,
              amount: Number(amount),
              note,
              userId: Number(user.id),
            });
        }}
      >
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
