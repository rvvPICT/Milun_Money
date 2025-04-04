import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { fetchAllUsersAPI } from "../services/userService"; // Import API function
import { useNavigation } from "@react-navigation/native";

const HSRPayTesting = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsersAPI();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Recipient:</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18 }}>{item.name} ({item.upiId})</Text>
            <Button 
              title="Send Payment" 
              onPress={() => navigation.navigate("RPayTestingScreen", { recipientId: item._id, userId })} 
            />
          </View>
        )}
      />
    </View>
  );
};

export default HSRPayTesting;
