import React, { useContext, useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import { DataContext } from '../App';

export default function Main() {
  const { taskList } = useContext(DataContext);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    taskList.forEach((e) => {
      if (e.type === 'Expense') {
        totalExpense += e.amount;
      } else {
        totalIncome += e.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [taskList]);

  return (
    <div className='bg-white p-4'>
      <h3 className='text-xl font-semibold'>BachatSetu</h3>
      <p className=''>Track your spending, unlock your savings</p>
      <div className='flex text-xl flex-col items-center justify-center'>
        <p>Total Savings Rs.{income - expense}</p>
      </div>
      <Form />
      <List />
    </div>
  );
}
