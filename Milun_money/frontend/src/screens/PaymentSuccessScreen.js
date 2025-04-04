import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentSuccessScreen = ({ route, navigation }) => {
  const { amount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Payment Successful!</Text>
      <Text style={styles.details}>Amount: ₹{amount}</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  details: { fontSize: 18, marginBottom: 20 },
});

export default PaymentSuccessScreen;
