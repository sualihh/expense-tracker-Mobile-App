import { StyleSheet, Text, TextInput, View } from "react-native";
import { Global } from "../../constants/styles";

function Input({label, invalid, style, textInputConfig }) {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
 
  
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal:4,
        marginVertical:8
    },
    label: {
        fontSize:12,
        color: Global.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: Global.colors.primary100,
        color: Global.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: Global.colors.error500
    },
    invalidInput: {
        backgroundColor: Global.colors.error50
    }
})