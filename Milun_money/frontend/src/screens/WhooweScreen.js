import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const WhoOwesYouScreen = () => {
  console.log("Rendering WhoOwesYouScreen"); // Debugging

  const debtors = [
    { id: "1", name: "sharvari", amount: 25, date: "28 Mar" },
    { id: "2", name: "vedika", amount: 120, date: "26 Mar" },
  ];

  const sendReminder = (name) => {
    console.log(`Reminder sent to ${name}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>Rs.{item.amount.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => sendReminder(item.name)}
        >
          <Text style={styles.buttonText}>Remind</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Time to Collect! ⏳</Text>
      </View>

      {/* List */}
      <FlatList
        data={debtors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={<View />} // Removed extra space causing unwanted text
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Ensure white background
  },
  listHeader: {
    padding: 76,
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
  reminderButton: {
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

export default WhoOwesYouScreen;
