import React, {useReducer, createContext} from 'react'

const initialState = []
export const ExpensesTrackerContext = createContext(initialState)

export const Provider = ({children}) =>{
    return(
        <ExpensesTrackerContext.Provider value={{appName: 'Expense Tracker'}}>
            {children}
        </ExpensesTrackerContext.Provider>
    )
}