import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";


import IconButton from "../component/UI/IconButton";
import { Global } from "../constants/styles";
import Button from "../component/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../component/MnageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

function ManageExpenses({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId
        const expensesCtx = useContext(ExpensesContext)



    const isEditing = !!editedExpenseId;



    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
        title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
    }, [navigation, isEditing])


    async function deleteExpenseHandler() {
        await deleteExpense(editedExpenseId)
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }
    async function confirmHandler(expenseData) {
              if (isEditing) {
            
             
              
             expensesCtx.updateExpense(editedExpenseId,expenseData);

             await updateExpense(editedExpenseId, expenseData)
        } else {
            const id = await storeExpense(expenseData)
            expensesCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();

    }
    
   
    return ( 
    <View style={styles.container}>
        <ExpenseForm 
        onCancel={cancelHandler} 
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing? "Update": "Add"}
        defaultValues={selectedExpense}
        />
        
        {isEditing &&(
            <View style={styles.deleteContainer}> 
                <IconButton 
                icon="trash" 
                color={Global.colors.error500} size={36} 
                onPress={deleteExpenseHandler} /> 
            </View>)}
    </View>)
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
         padding: 24,
         backgroundColor: Global.colors.primary800
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: Global.colors.primary200,
        alignItems: 'center'
    }
})