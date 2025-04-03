import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack'


import LoginScreen from './src/screens/LoginScreen.js';
import SignupScreen from './src/screens/SignupScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import AddEventScreen from './src/screens/AddEventScreen.js';
import ViewEventScreen from './src/screens/ViewEventScreen.js';

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


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
