import React from 'react';
import {AddExpense, ListExpenses} from './Expenses';

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
    <div>
      {toRender.map((item) => (
        <div key={item.page}>
          <h1>{item.title}</h1>
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default ExpensesPage;
