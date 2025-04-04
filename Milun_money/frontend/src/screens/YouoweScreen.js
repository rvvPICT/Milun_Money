
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Navbar from "../../Components/Navbar";

const YouOweScreen = ({ route }) => {
	const { userId } = route.params;
  console.log("Rendering YouOweScreen"); 


  const creditors = [
    { id: "1", name: "vedika", amount: 35, date: "1 Apr" },
    { id: "2", name: "veda", amount: 85.0, date: "30 Mar" },
  ];

  const payNow = (name) => {
    console.log(`Paying ${name}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>Rs.{item.amount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.payButton} onPress={() => payNow(item.name)}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
			<Navbar title="You Owe" userId={userId} />
			<View style={styles.container}>
				{/* List Header */}
				<View style={styles.listHeader}>
					<Text style={styles.listHeaderText}>Settle Your Debts 💰</Text>
				</View>

				{/* List */}
				<FlatList
					data={creditors}
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
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6f61",
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default YouOweScreen;
