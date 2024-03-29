'use client';
import {trpc} from '@/utils/trpc';
import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import {useSession} from 'next-auth/react';
import Title from '@/app/components/Title';
import {useToast} from '@/utils/useToast';
import {useRouter} from 'next/navigation';

// List of all expenses
export const ListExpenses = () => {
  const session = useSession();
  const user = session.data?.user;
  const userId = parseInt(user?.id, 10);
  const {toast} = useToast();

  const {
    data: expenses,
    isLoading,
    isFetching,
  } = trpc.expenses.getAll.useQuery(userId, {
    onError: () => {
      toast.error('Unable to retrieve expenses', {
        autoClose: true,
      });
    },
  });

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-64 md:w-96">
      {/* {JSON.stringify(expenses)} */}
      {!expenses?.length
        ? 'No expenses'
        : expenses?.map((expense) => (
            <ExpenseItem
              key={expense.id}
              {...expense}
            />
          ))}
    </div>
  );
};

// Main expense page
export const ViewExpense = ({id}: {id: number}) => {
  const {toast} = useToast();

  const {
    data: expense,
    isLoading,
    isFetching,
  } = trpc.expenses.getById.useQuery(
    {id},
    {
      onError: () => {
        toast.error('Unable to find expense', {
          autoClose: true,
        });
      },
    },
  );

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (!expense) {
    return <Title text="Expense does not exist" />;
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Title text={expense.description} />
      <div className="flex flex-col items-center py-5 px-2 mb-5 w-60 md:w-96 xl:w-6/12 text-slate-50 border-2 bg-blue-500 border-blue-500 rounded">
        {/* {JSON.stringify(expense)} */}
        <div className="flex items-center justify-center p-4 text:xl md:text-2xl xl:text-3xl font-medium mb-5 bg-yellow-500 rounded-full">
          {`£${expense?.amount}`}
        </div>
        <p className="text-md md:text-xl xl:text-2xl break-words">
          {expense?.note}
        </p>
      </div>
      <ExpenseForm
        page="edit"
        expense={expense}
      />
      <DeleteExpense id={id} />
    </div>
  );
};

// Add expense page
export const AddExpense = () => {
  return (
    <div>
      <ExpenseForm page="add" />
    </div>
  );
};

// Delete Expense button
export const DeleteExpense = ({id}: {id: number}) => {
  const {toast} = useToast();
  const router = useRouter();

  const {mutate} = trpc.expenses.delete.useMutation({
    onSuccess: () => {
      // console.log('deleted');
      toast.success('Expense successfully deleted!', {
        autoClose: true,
      });
      router.push('/dashboard/view');
    },
    onError: (err) => {
      // console.log(err);
      toast.error('Unable to delete expense', {
        autoClose: true,
      });
    },
  });

  return (
    <>
      <button
        onClick={() => {
          mutate({id});
        }}
        className="text-slate-50 font-medium rounded mt-1 py-2 px-4 w-60 md:w-96 bg-red-500"
      >
        Delete Expense
      </button>
    </>
  );
};
