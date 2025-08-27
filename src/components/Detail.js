import React from 'react';
import {Doughnut} from 'react-chartjs-2'
import useTransactions from "../customHook/useTransaction"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
// ChartJS.register(ArcElement, Tooltip, Legend);
export default function Detail({ data, classn }) {
  // Determine the border color based on the classn prop
  const borderColor = classn === 'expense' ? 'border-red-500' : 'border-green-500';
  const {total,chartData} = useTransactions(data);
  return (
    <div className={`border-b ${borderColor} bg-white p-4 shadow-sm`}>
      <h3 className='text-xl'>{data}</h3>
      <p>Rs.{total}</p>
      <p>data</p>
      {chartData.datasets.length>0  && < Doughnut data={chartData}/>}
  
     
    </div>
  );
}
