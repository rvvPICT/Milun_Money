

// export default AddEventPage;
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import Navbar from '../../Components/Navbar';

const AddEventPage = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [username, setUsername] = useState("");
  const [members, setMembers] = useState([]);

  const addMember = () => {
    if (username.trim() !== "") {
      setMembers([...members, username]);
      setUsername("");
    }
  };

  const handleSubmit = () => {
    if (eventName.trim() === "") {
      Alert.alert("Error", "Please enter an event name");
      return;
    }
    if (members.length === 0) {
      Alert.alert("Error", "Please add at least one member");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      name: eventName,
      members: members,
      createdAt: new Date(),
    };

    console.log("Event created:", newEvent);
    Alert.alert("Success", `Event "${eventName}" created successfully!`, [{
      text: "OK",
      onPress: () => {
        setEventName("");
        setMembers([]);
      }
    }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Add Event" onBackPress={() => navigation.navigate("HomeScreen")} />
      <View style={styles.container}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput style={styles.input} placeholder="Enter event name" value={eventName} onChangeText={setEventName} />
        
        <Text style={styles.label}>Add Members:</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={addMember}
          />
          <TouchableOpacity style={styles.addButton} onPress={addMember}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {members.length > 0 && (
          <View style={styles.membersContainer}>
            <Text style={styles.membersHeader}>Members ({members.length}):</Text>
            <FlatList
              data={members}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.memberRow}>
                  <Text style={styles.member}>{item}</Text>
                  <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={() => setMembers(members.filter((_, i) => i !== index))}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: { 
    padding: 20, 
    backgroundColor: "#f0f0f0", 
    flex: 1 
  },
  label: { fontSize: 18, fontWeight: "bold", color: "#470967", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  addButton: { backgroundColor: "#f16d95", padding: 12, borderRadius: 8, marginLeft: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  membersContainer: { marginBottom: 10 },
  membersHeader: { fontSize: 16, fontWeight: "bold", color: "#470967", marginBottom: 5 },
  memberRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginVertical: 5, borderRadius: 5, padding: 8 },
  member: { fontSize: 14, flex: 1 },
  removeButton: { padding: 5 },
  removeButtonText: { color: "#ff3b30", fontWeight: "bold" },
  submitButton: { backgroundColor: "#470967", padding: 15, borderRadius: 8, marginTop: 20 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default AddEventPage;