import axios from "axios" ;

const API_BASE_URL = "http://localhost:5000/api/trips" ;

export const createTrip = async (tripData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create` , tripData) ;
        return response.data ;     
    }catch(error){
        console.log("Error in creating trip :" , error.response?.data || error.message) ;
        return {success : false , message:error.response?.data.messgage}
    } 
}

export const getTrip = async (tripId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${tripId}`) ;
        return response.data ;
    }catch(error){
        console.log("Error fetching trip :",error.response?.data || error.message) ;
        return {success : false , message : error.response?.data.message || error.message } ;
    }
};

export const getAllTrips = async() =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data
    }catch(error){
        console.log("Error in fetching all the project :" , error.response?.data || error.message) ;
        return {sucess : false , message :error.response?.data || error.message } ;
    }
};

export const getUserTrips = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user trips:", error.response?.data || error.message);
      return { success: false, message: error.response?.data.message || error.message };
    }
}; 