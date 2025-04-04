import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../../Components/Navbar";
const TripDetailScreen = () => {
  const members = ["Alice", "Bob", "Charlie", "David"];
  const expenses = [
    { item: "Food", amount: "₹100" },
    { item: "Boating", amount: "₹300" },
    { item: "Hotel", amount: "₹500" }
  ];
  const receivables = [
    { name: "Bob", amount: "₹200" },
    { name: "Charlie", amount: "₹150" }
  ];
  const payables = [
    { name: "David", amount: "₹250" },
    { name: "Eve", amount: "₹100" }
  ];

  return (
    <View style={styles.container}>
        <Navbar title="Trip Details"/>
        
        <Text style={styles.eventName}>Trip to Goa</Text>
      <Image source={require("../../assets/viewtrip.jpg")} style={styles.image} />
      
      
      <Text style={styles.sectionTitle}>Members</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberBox}>
            <Text style={styles.memberText}>{member}</Text>
          </View>
        ))}
      </ScrollView>
      
      <Text style={styles.sectionTitle}>Total Expenses</Text>
      <View style={styles.expenseList}>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.expenseItem}>
            <Text style={styles.expenseText}>{expense.item}</Text>
            <Text style={styles.expenseAmount}>{expense.amount}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Receivables</Text>
      <View style={styles.listContainer}>
        {receivables.map((person, index) => (
          <View key={index} style={styles.moneyItem}>
            <Text style={styles.moneyText}>{person.name}</Text>
            <Text style={styles.moneyAmount}>{person.amount}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Payables</Text>
      <View style={styles.listContainer}>
        {payables.map((person, index) => (
          <View key={index} style={styles.payRow}>
            <Text style={styles.moneyText}>{person.name}</Text>
            <Text style={styles.moneyAmount}>{person.amount}</Text>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5", flex: 1 },
  image: { width: "100%", height: 200, borderRadius: 15, marginBottom: 15 },
  eventName: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#2c3e50" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15, color: "#34495e" },
  membersScroll: { flexDirection: "row", marginVertical: 10 },
  memberBox: { backgroundColor: "#1b1a56", padding: 12, borderRadius: 12, marginRight: 12,height:50 },
  memberText: { color: "white", fontWeight: "bold" },
  expenseList: { backgroundColor: "#ecf0f1", padding: 10, borderRadius: 10, marginTop: 5 },
  expenseItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  expenseText: { fontSize: 16, color: "#2c3e50" },
  expenseAmount: { fontSize: 16, fontWeight: "bold", color: "#27ae60" },
  listContainer: { backgroundColor: "#ecf0f1", padding: 10, borderRadius: 10, marginTop: 5 },
  moneyItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  moneyText: { fontSize: 16, color: "#2c3e50" },
  moneyAmount: { fontSize: 16, fontWeight: "bold", color: "#c0392b" },
  payRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5 },
  payButton: { backgroundColor: "#e74c3c", padding: 8, borderRadius: 5 },
  payText: { color: "white", fontWeight: "bold" }
});

export default TripDetailScreen;