import { Delete } from '@material-ui/icons'
import React, {useReducer, createContext} from 'react'
import reducer from './reducer'
import {DELETE, ADD} from './reducer'
const initialState = []
export const ExpensesTrackerContext = createContext(initialState)

export const Provider = ({children}) =>{
    const [transactions,dispatch] = useReducer(reducer, initialState)

    console.log('Transactions: ',transactions)

    const deleteTransaction = (id) =>{
        dispatch({type: DELETE, payload: id})
    }

    const addTransaction = (transaction) =>{
        dispatch({type: ADD, payload: transaction})
    }

    return(
        <ExpensesTrackerContext.Provider value={{
            deleteTransaction, addTransaction, transactions
        }}>
            {children}
        </ExpensesTrackerContext.Provider>
    )
}