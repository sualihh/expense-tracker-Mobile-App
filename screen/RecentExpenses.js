import ExpensesOutput from "../component/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";


function RecentExpenses() {
        const expensesCtx = useContext(ExpensesContext)
              

        useEffect(()  => {
            async function getExpense() {
               const expenses = await fetchExpense();
               expensesCtx.setExpenses(expenses)
            }

            getExpense();
        }, [])

        const recentExpenses = expensesCtx.expenses.filter((expense) => {
            const toDay = new Date();
            const date7DayBefore = getDateMinusDays(toDay, 7 )


            return expense.date > date7DayBefore
        })
    
    return <ExpensesOutput 
    expenses={recentExpenses}
    expensesPeriod="Last 7 days" fallbackText="No expenses registered for the last 7 day"/>
}

export default RecentExpenses;