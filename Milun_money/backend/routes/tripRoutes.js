import express from 'express';
import { createTrip, getTrip, getAllTrips, getUserTrips , getTripDetails } from '../controller/tripController.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/:tripId', getTrip);
router.get('/all', getAllTrips);
router.get('/user/:userId', getUserTrips);
//router.get("/:tripId", getTripDetails);

export default router;



