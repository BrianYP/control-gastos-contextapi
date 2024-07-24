import { Category, DraftExpense, Expense } from "../types"
import {v4 as uuidv4 } from 'uuid'


export type BudgetActions = 
{ type: 'add-budget', payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{ type: 'add-expense', payload: {expense: DraftExpense}} | 
{ type: 'remove-expense', payload: {id: Expense['id']}} |
{ type: 'get-expense-by-id', payload: {id: Expense['id']}} |
{ type: 'update-expense', payload: {expense: Expense}} |
{type: 'reset-app'} |
{type: 'add-filter-category', payload: {id: Category['id']}}

const createExpense = (draftExpense: DraftExpense) : Expense =>{
    return{
        ...draftExpense,
        id: uuidv4()
    }
}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

//localStorage
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    if (localStorageExpenses) {
        try {
            return JSON.parse(localStorageExpenses);
        } catch (error) {
            console.error('Error parsing localStorage expenses:', error);
            // Opcional: limpiar los datos corruptos
            localStorage.removeItem('expenses');
        }
    }
    return [];
}


export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expense: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) =>{

    if(action.type === 'add-budget'){
        return{
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload.expense)

        return{
            ...state,
            expense: [...state.expense, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expense: state.expense.filter(exp => exp.id !== action.payload.id)
        };
    }
    
    if(action.type === 'get-expense-by-id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expense: state.expense.map(exp => 
                exp.id === action.payload.expense.id ? action.payload.expense : exp
            ),
            modal: false,
            editingId: ''
        }
    }    

    if (action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expense: [],
        }
    }   

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    } 

    return state
}