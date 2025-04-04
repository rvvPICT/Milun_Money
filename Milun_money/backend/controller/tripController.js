import mongoose from "mongoose";
import User from "../model/user.js";
import Trip from "../model/trip.js";
import Payment from "../model/payments.js";
import dotenv from "dotenv";

dotenv.config();

//import Trip from "../models/Trip.js";
//import User from "../models/User.js";

export const createTrip = async (req, res) => {
    try {
        console.log("In controller") ;
        const { tripName, tripDescription, startDate, members } = req.body;

        console.log("Received data for create trip Succesfully !") ;
        
        if (!tripName || !startDate || !userId || members.length === 0) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if creator exists
        const creator = await User.findById(userId);
        if (!creator) {
            return res.status(404).json({ success: false, message: "User (creator) not found." });
        }

        // Check if all members exist
        const validMembers = await User.find({ _id: { $in: members } });

        if (validMembers.length !== members.length) {
            return res.status(404).json({ success: false, message: "One or more members do not exist." });
        }

        // Create the trip
        const newTrip = new Trip({
            tripName,
            tripDescription,
            startDate,
            members: [...members], // Add creator as a member too
        });

        const savedTrip = await newTrip.save();

        // Update creator and members with the trip
        const allUsers = [...members, userId]; // Include creator & members
        await User.updateMany({ _id: { $in: allUsers } }, { $push: { trips: savedTrip._id } });
        console.log("Creation Succesfull !") ;
        res.status(201).json({ success: true, message: "Trip created successfully!", trip: savedTrip });
    } catch (error) {
        console.error("Error creating trip:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
export const getTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId);fr
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }
        res.status(200).json({ success: true, trip });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json({ success: true, trips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// export const getUserTrips = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const trips = await Trip.find({ members: userId });
//         if (!trips) {
//             return res.status(404).json({ success: false, message: "No trips found for this user" });
//         }
//         res.status(200).json({ success: true, trips });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

export const getUserTrips = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate user
        const user = await User.findById(userId).populate("trips");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, trips: user.trips });
    } catch (error) {
        console.error("Error fetching user's trips:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const getTripDetails = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findById(tripId).populate("members").populate("payments");
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found." });
        }

        res.status(200).json({ success: true, trip });
    } catch (error) {
        console.error("Error fetching trip details:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
