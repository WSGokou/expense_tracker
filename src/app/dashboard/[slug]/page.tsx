import React from 'react';
import {AddExpense, ListExpenses} from './ExpensesFuncs';
import Title from '@/app/components/Title';

type Props = {
  params: {
    slug: string;
  };
};

const ExpensesPage = ({params}: Props) => {
  const url = params.slug;

  const render = [
    {
      page: 'view',
      title: 'Expenses',
      component: <ListExpenses />,
    },
    {
      page: 'add',
      title: 'Add Expense',
      component: <AddExpense />,
    },
  ];

  const toRender = render.filter((item) => item.page === url);

  return (
    <div className='flex flex-col items-center'>
      {toRender.map((item) => (
        <div key={item.page}>
          <Title text={item.title} />
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default ExpensesPage;
