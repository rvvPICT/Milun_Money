import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice.js';
import { useNavigation } from '@react-navigation/native';
import loginImage from '../../assets/loginimg.png';
import mmlogo from '../../assets/MMLogo.png';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!userId || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    const fakeToken = "sample-auth-token";
    dispatch(signup({ user: { userId, email }, token: fakeToken }));
    navigation.navigate("Home"); 
  };

	return (
    <View style={styles.container}>
      <Image source={mmlogo} style={styles.logoimage} />
      <Image source={loginImage} style={styles.image} />
      
      <TextInput 
        style={styles.input} 
        placeholder="User ID" 
        value={userId}
        onChangeText={setUserId}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signUpText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
		
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoimage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
  signUpText: {
    fontSize: 14,
    color: "black",
    marginTop: 10,
  },
});

export default SignupScreen;
