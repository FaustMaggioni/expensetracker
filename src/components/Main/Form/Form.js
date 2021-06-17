import React, {useState, useContext} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles'
import { ExpensesTrackerContext } from '../../../context/context';
import {v4 as uuidv4} from 'uuid'
import {incomeCategories, expenseCategories} from '../../../constants/categories'
import { formatDate } from '../../../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';



const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}



const Form = () => {
    const classes = useStyles()
    const [formData,setFormData] = useState(initialState)
    const {addTransaction} = useContext(ExpensesTrackerContext)
    const {segment} = useSpeechContext()

    const selectedCategory = formData.type === 'Income' || formData.type === 'Incomes'? incomeCategories : expenseCategories
    
    const createTransaction = () =>{
        
        if(formData.amount > 0){
            let transaction = {...formData, amount: Number(formData.amount), id: uuidv4() }
            if(!formData.category){
                console.log('aaa')
                transaction = {...transaction, category: selectedCategory[0].type}
                console.log(transaction)
            }
            console.log('trans: ',transaction)
            addTransaction(transaction)
            setFormData(initialState)
        }else{
            alert('Amount must be greater than 0')
            setFormData(initialState)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography aling='center' variant='subtitle2' gutterBottom>
                    {segment && (
                        <>
                            {segment.words.map((w) => (
                                w.value
                            )).join(' ')}
                        </>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel> Type </InputLabel>
                    <Select value={formData.type} onChange={(e)=> setFormData({...formData, type: e.target.value})}>
                        <MenuItem value='Income'> Income </MenuItem>
                        <MenuItem value='Expense'> Expense </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel > Category </InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {selectedCategory.map((c) => {
                            return(
                                <MenuItem key={c.type} value={c.type}>
                                    {c.type}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField value={formData.amount} onChange={(e)=> setFormData({...formData, amount: e.target.value})} type='number' label='Amount' fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField value={formData.date} onChange={(e)=> setFormData({...formData, date: formatDate(e.target.value)})} type='date' label='Date' fullWidth />
            </Grid>
            <Button onClick={createTransaction} className={classes.button} variant="outlined" color="primary" fullWidth >
                Create
            </Button>
        </Grid>
    )
}

export default Form
