import { Alert, StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { Global } from "../../constants/styles"

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues? defaultValues.amount.toString() :'',
            isValid: true
        },
        date: {
            value: defaultValues? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues? defaultValues.description: '',
            isValid:  true
        }
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
        return {
            ...curInputs, 
            [inputIdentifier]: {value: enteredValue, isValid: true
            }
        }
        })
    }


    function submitHandler() {
        const expenseData = {
          amount: +inputs.amount.value,
          date: new Date(inputs.date.value),
          description: inputs.description.value
        } 

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsvalid = expenseData.date.toString() !== 'Invalid Date';
        const decriptionIsValid = expenseData.description.trim().length > 0;


        if (!amountIsValid || !dateIsvalid || !decriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')

            setInputs((curInputs) => {
                return {
                    amount: {
                        value: curInputs.amount.value, isValid: amountIsValid
                    },
                    date: {
                        value: curInputs.date.value, isValid: dateIsvalid
                    },
                    description: {
                        value: curInputs.description.value, isValid: decriptionIsValid}

                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = 
    !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
           <View style={styles.inputRow}>
                <Input 
                style={styles.rowInput}
                label="Amount" 
                invalid= {!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                 onChangeText: inputChangeHandler.bind(this, 'amount'),
                 value: inputs.amount.value, 
              }}/>
                <Input 
                style={styles.rowInput}
                label="Date" 
                invalid= {!inputs.date.isValid}
                textInputConfig={{
                   placeholder: 'YYYY-MM-DD',
                  maxLength: 10,
                  onChangeText: inputChangeHandler.bind(this, 'date'),
                 value: inputs.date.value
                    }}/>
           </View>
            <Input 
            label="Description" 
            invalid= {!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                 value: inputs.description.value
            }}
            />
            { formIsInvalid && 
            <Text style={styles.errorText}>
                Invalid input, Please check your input values
                </Text>}
            <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
                Cancel
            </Button>  
            <Button style={styles.button} onPress={submitHandler}> 
                {submitButtonLabel}
            </Button>
        </View> 
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex:1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    button:{
        minWidth: 120,
         marginHorizontal: 8
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: Global.colors.error500,
        margin: 8
    }
})