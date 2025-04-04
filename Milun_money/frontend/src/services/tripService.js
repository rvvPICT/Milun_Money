import axios from "axios" ;

const API_BASE_URL = "http://10.0.2.2:5001/api/trips" ;

export const createTrip = async (tripData) => {
    try {
        console.log("In Api services") ;
        const response = await axios.post(`${API_BASE_URL}/create` , tripData) ;
        console.log("This was response from api services")
        return response.data ;     
    }catch(error){
        console.log("Error in creating trip :" , error.response?.data || error.message) ;
        return {success : false , message:error.response?.data.messgage}
    } 
}

export const getTrip = async (tripId) => {
    try {
        console.log("In Api : Received tripId " , tripId) ;
        console.log("Sending request on :" ,`${API_BASE_URL}/${tripId}`) ;
        const response = await axios.get(`${API_BASE_URL}/${tripId}`) ;
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
      console.log("In api services of getUserTrip:")
      console.log("Making request to :" ,`${API_BASE_URL}/user/${userId}`)
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user trips:", error.response?.data || error.message);
      return { success: false, message: error.response?.data.message || error.message };
    }
}; 