/**
 * Sample React Native App
 *
 * To run: npx expo start
 * 
 * On adding a new asset: npx react-native-asset  
 * 
 * Color palette : {
 *    #efe2fa,
 *    #bca5d4,
 *    #bacbfe,
 *    #8f9fe4,
 *    #7164b4
 * }
 * 
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import SplashScreen from './screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
// /import BudgetScreen from './screens/BudgetScreen';
// import ExpenseScreen from './screens/ExpenseScreen';
// import GroupExpenseScreen from './screens/GroupExpenseScreen';
import LoginScreen from './src/screens/LoginScreen.js';
import SignupScreen from './src/screens/SignupScreen.js';
//import PaymentScreen from './screens/PaymentScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
