import AsyncStorage from '@react-native-async-storage/async-storage';

// Store the auth token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token stored successfully');
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

// Get the auth token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Token retrieved:', token ? 'Token found' : 'No token found');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Remove the auth token (for logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    console.log('Token removed successfully');
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};