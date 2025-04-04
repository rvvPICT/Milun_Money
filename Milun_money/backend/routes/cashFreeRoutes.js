import express from "express";
import { createOrder } from "../controller/cashFreeController.js";

const router = express.Router();

// 🔹 Create a new payment order
router.post("/create-order", createOrder);

export default router;
