import * as SecureStore from "expo-secure-store";

export const storeToken = async (token) => {
  await SecureStore.setItemAsync("userToken", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("userToken");
};
