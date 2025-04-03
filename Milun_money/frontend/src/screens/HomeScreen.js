import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Navbar from 'C:/Users/vedik/MM/Milun_Money/Milun_money/frontend/Components/Navbar.js'; 

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Basic navbar usage */}
      <Navbar title="Budget Overview" />
      
      <View style={styles.content}>
        {/* Your screen content goes here */}
        <Text style={styles.text}>Your budget content will go here</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
  }
});

export default HomeScreen;