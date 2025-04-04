import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView
} from "react-native";
import Navbar from "../../Components/Navbar";

const IndividualExpenseScreen = ({ route }) => {
	const { userId } = route.params;
  console.log("Rendering IndividualExpenseScreen"); // Debugging

  // Sample data
  const expenses = [
    { id: "1", category: "Food", amount: 25, date: "24 April" },
    { id: "2", category: "Transport", amount: 12.5, date: "22 April" },
    { id: "3", category: "Shopping", amount: 87, date: "22 April" },
    
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>Rs.{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView>
			<Navbar title="Individual Expenses" userId={userId} />
    	<View style={styles.container}>
				{/* List Header */}
				<View style={styles.listHeader}>
					<Text style={styles.listHeaderText}>Your Expenses 📊</Text>
				</View>

				{/* List */}
				<FlatList
					data={expenses}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ paddingBottom: 20 }} // Shift everything lower
				/>
			</View>
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
  category: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E63946",
  },
});

export default IndividualExpenseScreen;