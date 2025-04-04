import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentFailureScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌ Payment Failed</Text>
      <Text style={styles.details}>Something went wrong.</Text>
      <Button title="Try Again" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'red' },
  details: { fontSize: 18, marginBottom: 20 },
});

export default PaymentFailureScreen;
