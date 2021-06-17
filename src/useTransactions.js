import {useContext} from 'react'
import {ExpensesTrackerContext} from './context/context'
import {incomeCategories, expenseCategories, resetCategories} from './constants/categories'

const useTransactions = (title) =>{
    console.log('Title: ',title)
    resetCategories()
    const {transactions} = useContext(ExpensesTrackerContext)
    const transactionesPerType = transactions.filter((t) => t.type === title)
    const total = transactionesPerType.reduce((acc, current) => acc += current.amount, 0)
    const categories = title === 'Incomes' || title==='Income' ? incomeCategories : expenseCategories
    console.log({title,transactionesPerType,total,categories})

    transactionesPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        if(category){
            category.amount += t.amount;
        }
    });

    const filteredCategories = categories.filter((c) => c.amount > 0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type)
    }

    return {total, chartData}
}

export default useTransactions