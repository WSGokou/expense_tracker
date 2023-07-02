import Title from '@/app/components/Title';
import {trpc} from '@/utils/trpc';
import {useToast} from '@/utils/useToast';
import type {Expense} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {FC, useState} from 'react';

type ExpenseFormProps = {
  page: string;
  expense?: Expense;
};

const ExpenseForm = ({page, expense}: ExpenseFormProps) => {
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount || 0);
  const [note, setNote] = useState(expense?.note || '');
  const session = useSession();
  const user = session?.data?.user;
  const {toast} = useToast();
  const router = useRouter();

  const create = trpc.expenses.create.useMutation({
    onSuccess: (expense) => {
      console.log('created', expense);
      toast.success('Expense successfully created!', {
        autoClose: true,
      });
      setDescription('');
      setAmount(0);
      setNote('');
    },
    onError: () => {
      toast.error('Unable to create expense', {
        autoClose: true,
      });
    },
  });
  const update = trpc.expenses.update.useMutation({
    onSuccess: () => {
      console.log('updated');
      toast.success('Expense successfully updated!', {
        autoClose: true,
      });
    },
    onError: () => {
      toast.error('Unable to edit expense', {
        autoClose: true,
      });
    },
  });

  return (
    <div className="flex flex-col items-center">
      <Title text={'Enter expense details:'} />
      <div className="flex flex-col gap-2 w-60 md:w-96">
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          className="border border-blue-200 rounded py-2 px-4"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          name="amount"
          value={amount}
          placeholder="Amount"
          className="border border-blue-200 rounded py-2 px-4"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        <textarea
          name="note"
          value={note}
          placeholder="Add a note for your expense (optional)"
          className="border border-blue-200 rounded py-2 px-4 h-40"
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button
          className="text-slate-50 font-medium rounded py-2 px-4 bg-green-500"
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
