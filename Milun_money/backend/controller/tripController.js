import mongoose from "mongoose";
import User from "../model/user.js";
import Trip from "../model/trip.js";
import Payment from "../model/payments.js";
import dotenv from "dotenv";

dotenv.config();

export const createTrip = async (req, res) => {
    const { tripName, tripDescription, startDate, members } = req.body;
    try {
        const newTrip = new Trip({
            tripName,
            tripDescription,
            startDate,
            members,
        });
        await newTrip.save();
        // res.status(201).json(newTrip);
        res.status(201).json({ success: true, message: "Trip created successfully", trip: newTrip });
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(201).json({ success: false, message: error.message });
    }
}

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

export const getUserTrips = async (req, res) => {
    const { userId } = req.params;
    try {
        const trips = await Trip.find({ members: userId });
        if (!trips) {
            return res.status(404).json({ success: false, message: "No trips found for this user" });
        }
        res.status(200).json({ success: true, trips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}