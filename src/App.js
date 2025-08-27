import React, { createContext, useState, useEffect } from 'react';
import Detail from './components/Detail';
import Main from './components/Main';

const DataContext = createContext();

export default function App() {
 
  const [taskList, setTaskList] = useState(() => {

    // Retrieve taskList from localStorage if available, else set to an empty array
    const savedTasks = localStorage.getItem('taskList');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Update localStorage whenever taskList changes
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  return (
    
    <DataContext.Provider value={{ taskList, setTaskList }}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 p-4">
        <Detail data={"Income"} classn={'income'} />
        <Main />
        <Detail data={"Expense"} classn={'expense'} />
      </div>
    </DataContext.Provider>
  );
}

export { DataContext };
