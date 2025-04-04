import React from "react";
import { 
  View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, Dimensions, Alert, ImageBackground, SafeAreaView
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

// Events array with images
const events = [
  { id: 1, name: "Goa Trip", image: require("../../assets/homeimg1.jpg") },
  { id: 2, name: "Hill Trek", image: require("../../assets/homeimg2.jpg") },
  { id: 3, name: "Beach Party", image: require("../../assets/homeimg3.jpg") },
  { id: 4, name: "Road Trip", image: require("../../assets/homeimg1.jpg") },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    Alert.alert("Profile Button Pressed", "You can navigate to Profile Screen!");
  };

  const handleAddEventPress = () => {
    Alert.alert("Add Event", "Redirecting to event creation!");
  };

  const handleEndEventPress = (eventName) => {
    Alert.alert("Event Ended", `${eventName} has been ended.`);
  };

  const goToTripDetails = () => {
    navigation.navigate("Tripdetails");
  };

  const goToExpenseDetails = () => {
    navigation.navigate("expense1");
  };

  const handleAddExpensePress = () => {
    Alert.alert("Add Expense", "You can add your expenses here!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require("../../assets/MMLogo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Image source={require("../../assets/profilelogo.png")} style={styles.profile} />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* My Events Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My Events</Text>
          <View style={styles.headingUnderline} />
        </View>

        {/* Event Section with Horizontal Scroll */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.eventScrollView}
          decelerationRate="fast"
          snapToInterval={width * 0.85 + 20}
          snapToAlignment="center"
        >
          {events.map((event) => (
            <View key={event.id} style={styles.eventCardContainer}>
              <ImageBackground 
                source={event.image} 
                style={styles.eventCardBackground}
                resizeMode="cover"
              >
                <View style={styles.eventCardOverlay}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                      style={[styles.button, styles.endEventButton]} 
                      onPress={() => handleEndEventPress(event.name)}
                    >
                      <Text style={styles.buttonText}>End Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.button, styles.viewEventButton]} 
                      onPress={goToTripDetails}
                    >
                      <Text style={styles.buttonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        {/* "Add Trip" Button */}
        <TouchableOpacity style={styles.addTripButton} onPress={handleAddEventPress}>
          <Text style={styles.addTripText}>+ New Event</Text>
        </TouchableOpacity>
        
        {/* Add Expense Prompt Section */}
        <View style={styles.expensePromptContainer}>
          <Image source={require("../../assets/homepage2.jpg")} style={styles.expensePromptImage} />
          <View style={styles.expensePromptTextContainer}>
            <Text style={styles.expensePromptTitle}>Track Your Expenses</Text>
            <Text style={styles.expensePromptDescription}>
              Click the + button below to add your expenses for any event.
            </Text>
          </View>
        </View>

        {/* Expense Details Section */}
        <TouchableOpacity onPress={goToExpenseDetails}>
          <View style={styles.expenseSectionContainer}>
            <View style={styles.emptyExpenseContainer}>
              <Text style={styles.emptyExpenseText}>Track Your Expense</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Add padding at bottom to ensure content isn't hidden behind the plus button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Plus Button (Add Expense) */}
      <TouchableOpacity style={styles.plusButtonContainer} onPress={handleAddExpensePress}>
        <View style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { paddingBottom: 100 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#470967",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  logo: { width: 65, height: 65, resizeMode: "contain", tintColor: "#ffffff" },
  profileButton: { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 25, padding: 8 },
  profile: { width: 40, height: 40, resizeMode: "contain", tintColor: "#ffffff" },

  headingContainer: { marginTop: 30, marginBottom: 20, alignItems: "center" },
  heading: { fontSize: 32, fontWeight: "bold", color: "#470967" },
  headingUnderline: { height: 4, width: 80, backgroundColor: "#f16d95", marginTop: 8, borderRadius: 2 },

  eventScrollView: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10 },
  eventCardContainer: { width: width * 0.85, height: 300, marginRight: 20, borderRadius: 20, overflow: "hidden" },
  eventCardBackground: { width: "100%", height: "100%" },
  eventCardOverlay: { width: "100%", height: "100%", padding: 20, justifyContent: "center", alignItems: "center" },
  eventName: { fontSize: 28, fontWeight: "bold", color: "#000" },

  addTripButton: { alignSelf: "center", margin: 20, backgroundColor: "#4daefd", padding: 15, borderRadius: 40 },
  addTripText: { color: "white", fontSize: 18, fontWeight: "bold" },

  plusButtonContainer: { position: "absolute", bottom: 30, alignSelf: "center", borderRadius: 30 },
  plusButton: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "#470967" },
  plusIcon: { color: "#ffffff", fontSize: 32, fontWeight: "bold" },
});

export default HomeScreen;
