import express from 'express';
import { createTrip, getTrip, getAllTrips, getUserTrips } from '../controller/tripController';

const router = express.Router();

router.post('/create', createTrip);
router.get('/:tripId', getTrip);
router.get('/', getAllTrips);
router.get('/user/:userId', getUserTrips);

export default router;