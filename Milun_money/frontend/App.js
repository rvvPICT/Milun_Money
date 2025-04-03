// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import {  createNativeStackNavigator } from '@react-navigation/native-stack'



// import HomeScreen from './src/screens/HomeScreen.js';
// import ExpenseScreen from './src/screens/ExpenseScreen.js';
// //import TripdetailScreen from './src/screens/TripdetailScreen.js';



// const Stack = createNativeStackNavigator();


// function App() {

//   return (
//     // <SafeAreaView style={{flex:1}}>
//     //   {/* <Homepage/> */}
//     //   <Signin/>
//     // </SafeAreaView>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home'>
//         <Stack.Screen
//           name='Home'
//           component={HomeScreen}
//           options={{headerShown:false}}
//         />
//         {/* <Stack.Screen
//           name='Tripdetail'
//           component={TripdetailScreen}
//           options={{headerShown:false}}
//         /> */}
//         <Stack.Screen
//           name='expense1'
//           component={ExpenseScreen}
//           options={{headerShown:false}}
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ExpenseScreen from './src/screens/ExpenseScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ExpenseScreen/>
      {/* <Text>"sharvari"</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
