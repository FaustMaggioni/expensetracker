const reducer = (state = [], action) =>{
    let transactions
    switch(action.type){
        case ADD: 
            transactions = [action.payload, ...state]
            return transactions
        case DELETE: 
            transactions = state.filter((t) => t.id !== action.payload)
            return transactions
        default: 
            return state
            break;
    }
}

export const ADD = 'ADD'
export const DELETE = 'DELETE'
export default reducer