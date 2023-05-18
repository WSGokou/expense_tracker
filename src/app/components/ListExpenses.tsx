'use client';
import {trpc} from '@/utils/trpc';
import React from 'react';

const ListExpenses = () => {
  const response = trpc.expenses.list.useQuery();
  return <div>ListExpenses</div>;
};

export default ListExpenses;
