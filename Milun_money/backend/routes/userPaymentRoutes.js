import express from 'express';
import { getCompletedPayments, getPendingPaymentsFromUser, getPendingPaymentsToUser, getIndividualPayments } from '../controller/userPaymentController';

const router = express.Router();

router.get('/individual/:userId', getIndividualPayments);
router.get('/completed/:userId', getCompletedPayments);
router.get('/pending/from/:userId', getPendingPaymentsFromUser);
router.get('/pending/to/:userId', getPendingPaymentsToUser);

export default router;