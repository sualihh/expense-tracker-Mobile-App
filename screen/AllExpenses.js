import { Text } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {

    const expensesCtx = useContext(ExpensesContext)
    return <ExpensesOutput 
    expenses={expensesCtx.expenses}
    expensesPeriod="Total" fallbackText="No expenses registered " />
}

export default AllExpenses;