import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView
} from "react-native";

const TripExpenseScreen = () => {
  console.log("Rendering TripExpenseScreen"); // Debugging

  // Sample data
  const trips = [
    { id: "1", title: "Beach Weekend", date: "Mar 15-17", members: 4, total: 856 },
    { id: "2", title: "Mountain Trip", date: "Feb 10-12", members: 3, total: 647 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDetails}>{item.date} • {item.members} people</Text>
      </View>
      <Text style={styles.amount}>Rs.{item.total.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Your Trip Expenses 🏕️</Text>
      </View>

      {/* List */}
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }} // Shift everything lower
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Move content a little lower
  },
  listHeader: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listHeaderText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  tripDetails: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
  },
});

export default TripExpenseScreen;
