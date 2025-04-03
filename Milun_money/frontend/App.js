import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'C:/Users/vedik/MM/Milun_Money/Milun_money/frontend/src/screens/HomeScreen.js';
import AddEventPage from './src/screens/AddEventScreen.js';
import AddPaymentPage from './src/screens/AddPaymentScreen.js';
import BudgetQuestionnaireScreen from './src/screens/BudgetQuestionnaireScreen.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Questionnair" component={BudgetQuestionnaireScreen} /> */}
      {/* <Stack.Screen name="AddPayment" component={AddPaymentPage} /> */}
        <Stack.Screen name="AddEvent" component={AddEventPage} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}