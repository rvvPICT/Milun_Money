import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const handleBackPress = () => {
  console.log("Back button pressed");
};

const showConfirmationAlert = () => {
  Alert.alert(
    "Unsaved Changes",
    "You have unsaved changes. Are you sure you want to go back?",
    [
      { text: "Stay", style: "cancel" },
      { text: "Discard", onPress: () => console.log("Navigating back") }
    ],
    { cancelable: false }
  );
};

// Styles remain here in case needed elsewhere in your project
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 15,
    top: 55,
    padding: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  }
});

export default handleBackPress;
