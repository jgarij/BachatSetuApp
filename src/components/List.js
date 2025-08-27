import React, { useContext } from 'react'
import { DataContext } from '../App';
import { MdDelete } from "react-icons/md";

import "../style.css"  // Import the CSS file
export default function List() {
    const {taskList,setTaskList} = useContext(DataContext)
    console.log("Tasklist ",taskList)
    function handleDelete(id){
        setTaskList(prevlist =>prevlist.filter(expense=>expense.id!==id))  
    }
    return (
        <div>
            <div className="list-container bg-slate-50 mt-1">
                {taskList.map((expense) => (
                    <div key={expense.id} className="list-item  mt-2 ">
                        <div className='flex justify-between'>
                            <div className='flex gap-3 items-center'>
                            <p className={`h-4 w-4 rounded-full ${expense.type === 'Income' ? 'bg-green-900' : 'bg-red-800'}`}    ></p>
                            <div className='flex flex-col leading-[9px]  gap-2'>
                                <p>{expense.category}</p>
                                <div className='flex gap-7'>
                                <p>Rs.{expense.amount}</p>
                                <p>{expense.date}</p>
                                </div>
                            </div>
                            </div>
                            <MdDelete onClick={() => handleDelete(expense.id)} className="w-6 h-5 cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
)}
