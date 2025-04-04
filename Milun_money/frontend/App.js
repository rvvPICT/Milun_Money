
// /**
//  * Sample React Native App
//  *
//  * To run: npx expo start
//  * 
//  * On adding a new asset: npx react-native-asset  
//  * 
//  * Color palette : {
//  *    #efe2fa,
//  *    #bca5d4,
//  *    #bacbfe,
//  *    #8f9fe4,
//  *    #7164b4
//  * }
//  * 
//  * @format
//  */

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// //import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './src/screens/HomeScreen';
// // /import BudgetScreen from './screens/BudgetScreen';
// // import ExpenseScreen from './screens/ExpenseScreen';
// // import GroupExpenseScreen from './screens/GroupExpenseScreen';
// import LoginScreen from './src/screens/LoginScreen.js';
// import SignupScreen from './src/screens/SignupScreen.js';
// import TripDetailScreen from './src/screens/tripDetailScreen.js';
// //import PaymentScreen from './screens/PaymentScreen';
// import AddEventPage from './src/screens/AddEventScreen.js';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Login'>
//                 <Stack.Screen
//           name='Login'
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Signup'
//           component={SignupScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Home'
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='TripDetails'
//           component={TripDetailScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='AddEventPage'
//           component={AddEventPage}
//           options={{ headerShown: false }}
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WhoOwesYouScreen from './src/screens/WhooweScreen';
import YouOweScreen from './src/screens/YouoweScreen';
import IndividualExpenseScreen from './src/screens/IndividualexpScreen';
import TripexpScreen from './src/screens/TripexpScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <YouOweScreen/>
      <Text>"sharvari"</Text>
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
