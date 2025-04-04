import axios from 'axios' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'http://10.0.2.2:8080/api/auth/users';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001/api/auth/users' 
    : 'http://10.0.2.2:5001/api/auth/users';

export const signup_post = async (userData) => {
    try {
        // const response = await axios.post(⁠ ${API_URL}/signup ⁠ , userData) ;
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data ;
    }catch(error) {
        return {error : error.response?.data?.message || "Signup Failed"} 
    }
};

export const login_post = async (userData) => {
    try {
        console.log("Sending Login Request:", userData);

        const response = await axios.post(`${API_URL}/login`, userData);
        console.log("Received Response from API:", response.data);

        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);

        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response?.data);
        return { error: error.response?.data?.message || "Login failed" };
    }
};

