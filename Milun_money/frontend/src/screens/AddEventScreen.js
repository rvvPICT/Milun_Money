import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import Navbar from '../../Components/Navbar.js';
import { searchUsersAPI } from "../services/userService.js";
import { useNavigation } from "@react-navigation/native";

import { createTripAPI } from "../services/tripService.js";

const AddEventPage = ({ route }) => {
  const navigation = useNavigation();
  const userId = route.params.userId;
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [username, setUsername] = useState("");
  const [members, setMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const addMember = () => {
    const trimmed = username.trim();
    const existing = searchResults.find(u => u.username === trimmed);
  
    if (existing) {
      const userId = existing._id || existing.id;
      
      if (!members.includes(userId) && !members.some(m => m === userId)) {
        setMembers([...members, userId]);
        setSelectedUsers([...selectedUsers, existing]);
        setUsername("");
        setSearchResults([]);
        setFeedbackMessage(`${existing.username} added successfully`);
        setTimeout(() => setFeedbackMessage(""), 3000);
      } else {
        setFeedbackMessage(`${existing.username} is already in the list`);
        setTimeout(() => setFeedbackMessage(""), 3000);
      }
    } else if (trimmed) {
      setFeedbackMessage("User not found");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        if (username.trim() !== "") {
          try {
            const users = await searchUsersAPI(username);
            console.log("Search results:", users);
            setSearchResults(users);
          } catch (error) {
            console.error("Search failed:", error);
          }
        } else {
          setSearchResults([]);
        }
      };
      fetchUsers();
    }, 300);
  
    return () => clearTimeout(delayDebounce);
  }, [username]);

  const addNewMember = (item) => {
    console.log("Adding item:", item);
    
    const userId = item._id || item.id;
    
    if (!userId) {
      console.error("User has no valid ID:", item);
      setFeedbackMessage("Error: User has no valid ID");
      setTimeout(() => setFeedbackMessage(""), 3000); 
      return;
    }
    
    if (!members.includes(userId) && !members.some(m => m === userId)) {
      setMembers(prev => [...prev, userId]);
      setSelectedUsers(prev => [...prev, item]);
      setUsername("");
      setSearchResults([]);
      console.log("User added successfully");
      setFeedbackMessage(`${item.username} added successfully`);
      setTimeout(() => setFeedbackMessage(""), 3000);
    } else {
      console.log("User already in list");
      setFeedbackMessage(`${item.username} is already in the list`);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };
  
  

  const handleSubmit = async () => {
    if (!eventName || members.length === 0) {
      Alert.alert("Please fill all fields");
      return;
    }
    const tripData = {
      tripName: eventName,
      tripDescription: "Optional trip description",
      members: [...members, userId],
    };

    try {
      const response = await createTripAPI(tripData);
      console.log("Trip created:", response.trip);
      Alert.alert("Trip Created Successfully");
    } catch (err) {
      console.error("Error:", err.message);
      Alert.alert("Error", err.message || "Failed to create trip");
    }
    navigation.navigate("Home", { userId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Add Event" />
      <View style={styles.container}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event name"
          value={eventName}
          onChangeText={setEventName}
        />
        <Text style={styles.label}>Event Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event description"
          value={eventDescription}
          onChangeText={setEventDescription}
        />

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

        {feedbackMessage ? (
          <View style={styles.feedbackContainer}>
            <Text style={[
              styles.feedbackText, 
              feedbackMessage.includes("already") ? styles.warningText : 
              feedbackMessage.includes("successfully") ? styles.successText : 
              styles.errorText
            ]}>
              {feedbackMessage}
            </Text>
          </View>
        ) : null}

        {/* Suggestions Dropdown */}
        {searchResults.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={searchResults}
              // keyExtractor={(item) => item.id.toString()}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => addNewMember(item)}
                >
                  <Text style={styles.suggestionText}>{item.username}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {selectedUsers.length > 0 && (
          <View style={styles.membersContainer}>
            <Text style={styles.membersHeader}>Members ({selectedUsers.length}):</Text>
            <FlatList
              data={selectedUsers}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              renderItem={({ item, index }) => (
                <View style={styles.memberRow}>
                  <Text style={styles.member}>{item.username}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => {
                      setMembers(members.filter(id => id !== item.id));
                      setSelectedUsers(selectedUsers.filter(u => u.id !== item.id));
                    }}
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
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#f16d95",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    maxHeight: 150,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
  },
  membersContainer: {
    marginBottom: 10,
  },
  membersHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#470967",
    marginBottom: 5,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
    padding: 8,
  },
  member: {
    fontSize: 14,
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: "#ff3b30",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#470967",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  feedbackContainer: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  feedbackText: {
    fontSize: 14,
    textAlign: 'center',
  },
  successText: {
    color: '#28a745',
  },
  warningText: {
    color: '#ffc107',
  },
  errorText: {
    color: '#dc3545',
  },
});

export default AddEventPage;
