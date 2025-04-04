// import axios from 'axios' ;
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // const API_URL = 'http://10.0.2.2:8080/api/auth/users';
// import { Platform } from 'react-native';

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/auth/users' 
//     : 'http://10.0.2.2:5001/api/auth/users';

// export const signup_post = async (userData) => {
//     try {
//         // const response = await axios.post(⁠ ${API_URL}/signup ⁠ , userData) ;
//         const response = await axios.post(`${API_URL}/signup`, userData);
//         return response.data ;
//     }catch(error) {
//         return {error : error.response?.data?.message || "Signup Failed"} 
//     }
// };

// export const login_post = async (userData) => {
//     try {
//         console.log("Sending Login Request:", userData);

//         const response = await axios.post(`${API_URL}/login`, userData);
//         console.log("Received Response from API:", response.data);

//         const { token } = response.data;
//         await AsyncStorage.setItem('authToken', token);

//         return response.data;
//     } catch (error) {
//         console.error("Login API Error:", error.response?.data);
//         return { error: error.response?.data?.message || "Login failed" };
//     }
// };

import axios from 'axios';
import { Platform } from 'react-native';
import { storeToken, getToken } from '../utils/auth';

// Using platform-specific API URL
const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001/api/auth/users' 
    : 'http://10.0.2.2:5001/api/auth/users';

export const signup_post = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        
        // If signup returns a token, store it immediately
        if (response.data.token) {
            await storeToken(response.data.token);
        }
        
        return response.data;
    } catch(error) {
        return {error: error.response?.data?.message || "Signup Failed"};
    }
};

export const login_post = async (userData) => {
    try {
        console.log("Sending Login Request:", userData);

        const response = await axios.post(`${API_URL}/login`, userData);
        console.log("Received Response from API:", response.data);

        const { token } = response.data;
        
        // Store token using our utility function
        if (token) {
            const stored = await storeToken(token);
            if (!stored) {
                console.error("Failed to store authentication token");
            }
        }

        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response?.data);
        return { error: error.response?.data?.message || "Login failed" };
    }
};

// Utility function for authenticated requests
export const makeAuthenticatedRequest = async (url, method = 'get', data = null) => {
    try {
        const token = await getToken();
        
        if (!token) {
            console.log("No token found, user not authenticated");
            return { error: 'User not authenticated' };
        }
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        let response;
        if (method.toLowerCase() === 'get') {
            response = await axios.get(url, config);
        } else if (method.toLowerCase() === 'post') {
            response = await axios.post(url, data, config);
        } else if (method.toLowerCase() === 'put') {
            response = await axios.put(url, data, config);
        } else if (method.toLowerCase() === 'delete') {
            response = await axios.delete(url, config);
        }
        
        return response.data;
    } catch (error) {
        console.error("API request error:", error.response?.data);
        return { error: error.response?.data?.message || "Request failed" };
    }
};