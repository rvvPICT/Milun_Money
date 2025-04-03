import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = (props) => {
  const { title, showBackButton = true, onBackPress, customAction } = props;
  const navigation = useNavigation();
  const route = useRoute();

  // Default confirmation dialog for unsaved changes
  const showConfirmationAlert = () => {
    Alert.alert(
      "Unsaved Changes",
      "You have unsaved changes. Are you sure you want to go back?",
      [
        {
          text: "Stay",
          onPress: () => console.log("User chose to stay"),
          style: "cancel",
        },
        {
          text: "Discard",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const screensWithConfirmation = ["AddExpense", "EditBudget", "CreateBudget"];

  const handleBackPress = () => {

    if (onBackPress) {
      onBackPress();
      return;
    }
      navigation.goBack();
};

  return (
    <View style={styles.navbar}>
      {/* Back Button (only shown if showBackButton is true) */}
      {showBackButton && (
        <Pressable onPress={handleBackPress} style={styles.backButton}>
          <Image 
            // You'll need to add your own back arrow icon
            source={require('C:/Users/vedik/MM/Milun_Money/Milun_money/frontend/assets/backarrow.png')} 
            style={styles.backIcon} 
            resizeMode='contain'
          />
        </Pressable>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Optional custom action on the right */}
      {customAction && (
        <Pressable onPress={customAction.onPress} style={styles.actionButton}>
          {customAction.icon ? (
            <Image 
              source={customAction.icon} 
              style={styles.actionIcon} 
              resizeMode='contain'
            />
          ) : (
            <Text style={styles.actionText}>{customAction.title}</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#470967', 
    padding: 15,
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, 
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
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
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  actionButton: {
    position: 'absolute',
    right: 15,
    top: 55,
    padding: 10,
    zIndex: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});