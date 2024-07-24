import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budgetReducer";

export type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const totalExpenses = useMemo(() => state.expense.reduce((total, expense) => expense.amount + total, 0), [state.expense])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
}
