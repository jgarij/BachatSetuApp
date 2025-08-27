
import {useContext,useState,useEffect} from "react"
import {DataContext} from "../App"
import { incomeCategories,expenseCategories } from "../constant/categories";
const useTransactions=(title)=>{

const {taskList} = useContext(DataContext);
const selectedlist = taskList.filter((t)=>t.type===title);
const total = selectedlist.reduce((acc,curr)=>acc+curr.amount,0);
const selectedCategories = title==="Income"?incomeCategories:expenseCategories;
selectedCategories.map((m)=>m.amount=0);
selectedlist.forEach((m)=>{
    const category = selectedCategories.find((c)=> c.type === m.category);
    if(category)
    {category.amount +=m.amount;}
})
const filteredList = selectedCategories.filter((c)=>c.amount>0);
const chartData={
    labels :filteredList.map((f)=>f.type),
    datasets :[{
        data : filteredList.map((f)=>f.amount),
        backgroundColor:filteredList.map((f)=>f.color)
    }]
    
}
console.log(chartData)
return {total,chartData}
}

export default useTransactions