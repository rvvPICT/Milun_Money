// 
import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import Navbar from '../../Components/Navbar';

// Assuming you've downloaded icon files to the assets folder
// You would need to replace these paths with your actual icon paths
const categoryIcons = {
  "Travel": require('../../assets/icons/travel.png'),
  "Food": require('../../assets/icons/food.png'),
  "Education": require('../../assets/icons/education.png'),
  "Entertainment": require('../../assets/icons/entertainment.png'),
  "Accommodation": require('../../assets/icons/accommodation.png'),
  "Other": require('../../assets/icons/other.png')
};

const AddPaymentPage = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [paymentType, setPaymentType] = useState("individual");
  const [numMembers, setNumMembers] = useState("3"); // Default to 3 for testing
  const [members, setMembers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventParticipants, setEventParticipants] = useState([]);
  
  const categories = ["Travel", "Food", "Education", "Entertainment", "Accommodation", "Other"];
  const events = [
    { id: "1", name: "Beach Trip", participants: ["Alice", "Bob", "Charlie", "David", "Emma"] },
    { id: "2", name: "Dinner Party", participants: ["Frank", "Grace", "Hannah", "Isaac"] },
    { id: "3", name: "Movie Night", participants: ["Jacob", "Kate", "Liam", "Mia", "Noah"] },
    { id: "4", name: "Game Day", participants: ["Olivia", "Peter", "Quinn", "Ryan", "Sophia"] }
  ];

  // Set the first event as default for testing
  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      handleSelectEvent(events[0].id);
    }
  }, []);

  const handleSelectEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setEventParticipants(event ? event.participants : []);
    // Reset members when event changes
    setMembers([]);
  };

  const handleMemberToggle = (participant) => {
    const maxMembers = parseInt(numMembers) || 0;
    
    if (members.includes(participant)) {
      // Always allow removing
      setMembers(members.filter(m => m !== participant));
    } else if (members.length < maxMembers) {
      // Only allow adding if under the limit
      setMembers([...members, participant]);
    }
  };

  const handleSubmit = () => {
    if (!amount.trim() || !category) {
      Alert.alert("Error", "Please enter all required fields");
      return;
    }
    if (paymentType === "group" && (!selectedEvent || members.length === 0)) {
      Alert.alert("Error", "Please complete the group payment details");
      return;
    }
    Alert.alert("Success", "Payment recorded successfully!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Navbar title="Add Payment" onBackPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Text style={styles.label}>Amount Paid:</Text>
          <TextInput style={styles.input} placeholder="Enter amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
          
          <Text style={styles.label}>Description:</Text>
          <TextInput style={styles.input} placeholder="Enter description" value={description} onChangeText={setDescription} />
          
          <Text style={styles.label}>Category:</Text>
          <View style={styles.categoryIconContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.categoryIconWrapper, category === cat && styles.selectedCategoryIcon]} 
                onPress={() => setCategory(cat)}
              >
                <Image 
                  source={categoryIcons[cat]} 
                  style={styles.categoryIcon} 
                  resizeMode="contain"
                />
                <Text style={[styles.categoryLabel, category === cat && styles.selectedCategoryLabel]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Payment Type:</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity style={[styles.toggleButton, paymentType === "individual" && styles.activeButton]} onPress={() => setPaymentType("individual")}>
              <Text style={[styles.toggleText, paymentType === "individual" && styles.activeText]}>Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleButton, paymentType === "group" && styles.activeButton]} onPress={() => setPaymentType("group")}>
              <Text style={[styles.toggleText, paymentType === "group" && styles.activeText]}>Group</Text>
            </TouchableOpacity>
          </View>
          
          {paymentType === "group" && (
            <View>
              <Text style={styles.label}>Select Event:</Text>
              <View style={styles.customPicker}>
                {events.map(event => (
                  <TouchableOpacity 
                    key={event.id} 
                    style={[styles.pickerItem, selectedEvent?.id === event.id && styles.selectedPickerItem]} 
                    onPress={() => handleSelectEvent(event.id)}
                  >
                    <Text style={[styles.pickerItemText, selectedEvent?.id === event.id && styles.selectedPickerItemText]}>
                      {event.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.label}>Number of Members:</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter number of members" 
                keyboardType="numeric" 
                value={numMembers} 
                onChangeText={(text) => {
                  setNumMembers(text);
                  // If new number is less than current selections, trim the selections
                  const newMax = parseInt(text) || 0;
                  if (members.length > newMax) {
                    setMembers(members.slice(0, newMax));
                  }
                }} 
              />
              
              {selectedEvent && (
                <View>
                  <Text style={styles.label}>Select Members to Split With:</Text>
                  <Text style={styles.subText}>
                    You have selected {members.length} of {numMembers} members
                  </Text>
                  {eventParticipants.map((participant, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.memberOption, 
                        members.includes(participant) && styles.selectedMemberOption,
                        members.length >= parseInt(numMembers) && !members.includes(participant) ? styles.disabledMemberOption : {}
                      ]} 
                      onPress={() => handleMemberToggle(participant)}
                    >
                      <Text 
                        style={[
                          styles.memberText,
                          members.includes(participant) ? styles.selectedMemberText : {},
                          members.length >= parseInt(numMembers) && !members.includes(participant) ? styles.disabledText : {}
                        ]}
                      >
                        {participant}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
  container: { padding: 20, flex: 1 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  subText: { fontSize: 14, color: "#666", marginBottom: 10, fontStyle: "italic" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
  
  // New styles for category icons
  categoryIconContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between",
    marginBottom: 15 
  },
  categoryIconWrapper: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  selectedCategoryIcon: {
    backgroundColor: "#e0d3e8",
    borderColor: "#470967",
    borderWidth: 2
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  categoryLabel: {
    fontSize: 12,
    color: "#000"
  },
  selectedCategoryLabel: {
    fontWeight: "bold",
    color: "#470967"
  },
  
  // Original styles
  customPicker: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  pickerItem: { 
    padding: 10, 
    marginRight: 10, 
    marginBottom: 5, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    backgroundColor: "#fff" 
  },
  selectedPickerItem: { 
    backgroundColor: "#470967", 
    borderColor: "#470967" 
  },
  pickerItemText: { color: "#000" },
  selectedPickerItemText: { color: "#fff" },
  toggleContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  toggleButton: { padding: 12, borderRadius: 8, backgroundColor: "#ddd", flex: 1, alignItems: "center", marginHorizontal: 5 },
  activeButton: { backgroundColor: "#470967" },
  toggleText: { fontWeight: "bold", color: "#000" },
  activeText: { color: "#fff" },
  memberOption: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginVertical: 5, backgroundColor: "#fff" },
  memberText: { color: "#000" },
  selectedMemberOption: { backgroundColor: "#e0d3e8", borderColor: "#470967" },
  selectedMemberText: { fontWeight: "bold", color: "#470967" },
  disabledMemberOption: { backgroundColor: "#f8f8f8", borderColor: "#ddd" },
  disabledText: { color: "#ccc" },
  submitButton: { backgroundColor: "#470967", padding: 15, borderRadius: 8, marginTop: 20 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default AddPaymentPage;