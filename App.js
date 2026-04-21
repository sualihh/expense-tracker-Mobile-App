import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenses from './screen/ManageExpenses';
import RecentExpenses from './screen/RecentExpenses';
import AllExpenses from './screen/AllExpenses';

import { Global } from './constants/styles';
import IconButton from './component/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  return (
  <BottomTabs.Navigator screenOptions={({navigation}) => ({
    headerStyle: {backgroundColor: Global.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: Global.colors.primary500},
    tabBarActiveTintColor: Global.colors.accent500,
    headerRight: ({tintColor}) => <IconButton 
        icon="add" 
        size={24} 
        color={tintColor} 
        onPress={() => {
           navigation.navigate('Manage expenses')
        }} />
  })}>
      <BottomTabs.Screen name="Recent expenses"  component={RecentExpenses} 
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({color, size }) => <Ionicons name="hourglass" size={size}
          color={color} /> 
      }}/>
      <BottomTabs.Screen name="All expenses" component={AllExpenses}
      options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({color, size }) => <Ionicons name="calendar" size={size}
          color={color} /> 
      }} />
  </BottomTabs.Navigator>)
}
 

export default function App() {
  return (
    <>
      <StatusBar style="light" /> 
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Global.colors.primary500},
          headerTintColor: 'white'
        }}>
          <Stack.Screen name="Expenses Overview" component={ExpensesOverview} 
          options={{headerShown: false}} />
          <Stack.Screen name="Manage expenses" component={ManageExpenses}
          options={{
            presentation: 'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

