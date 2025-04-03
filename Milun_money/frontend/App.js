import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack'



import HomeScreen from './src/screens/HomeScreen.js';
import TripdetailScreen from './src/screens/TripdetailScreen.js';


const Stack = createNativeStackNavigator();


function App() {

  return (
    // <SafeAreaView style={{flex:1}}>
    //   {/* <Homepage/> */}
    //   <Signin/>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Tripdetail'
          component={TripdetailScreen}
          options={{headerShown:false}}
        />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;