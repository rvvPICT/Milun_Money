import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './src/screens/LoginScreen.js';
import SignupScreen from './src/screens/SignupScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import AddEventPage from './src/screens/AddEventScreen.js';
import ExpenseScreen from './src/screens/ExpenseScreen.js';
import AddPaymentPage from './src/screens/AddPaymentScreen.js';
import TripDetailScreen from './src/screens/tripDetailScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import WhoOwesYouScreen from './src/screens/WhooweScreen.js';
import YouOweScreen from './src/screens/YouoweScreen.js';
import IndividualExpenseScreen from './src/screens/IndividualexpScreen.js';
import TripExpenseScreen from './src/screens/TripexpScreen.js';
import HSRPayTesting from './src/screens/HSRPayTesting.js';
import RPayTestingScreen from './src/screens/RPayTestingScreen.js';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen.js';
import PaymentFailureScreen from './src/screens/PaymentFailureSCreen.js';
import BudgetQuestionnaireScreen from './src/screens/BudgetQuestionnaireScreen.js';

const Stack = createNativeStackNavigator();

function App() {

  return (
    // <SafeAreaView style={{flex:1}}>
    //   {/* <Homepage/> */}
    //   <Signin/>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='AddEvent'
          component={AddEventPage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='ExpenseScreen'
          component={ExpenseScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='AddPaymentPage'
          component={AddPaymentPage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='TripDetails'
          component={TripDetailScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Exp1'
          component={WhoOwesYouScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Exp2'
          component={YouOweScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Exp3'
          component={IndividualExpenseScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Exp4'
          component={TripExpenseScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='HSRPayTesting'
          component={HSRPayTesting}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='RPayTestingScreen'
          component={RPayTestingScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='PaymentSuccessScreen'
          component={PaymentSuccessScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='PaymentFailureScreen'
          component={PaymentFailureScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='ManageYourBudget'
          component={BudgetQuestionnaireScreen}
          options={{headerShown:false}}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
