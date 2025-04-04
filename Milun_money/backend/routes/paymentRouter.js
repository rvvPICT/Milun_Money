import express from "express";
import Razorpay from "razorpay";
import User from "../model/user.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { createPayment, getTripPayments, getUserToOwnerPayment, getFromMemberToUserPayment } from "../controller/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

router.post("/create", createPayment);
router.get("/:tripId", getTripPayments);
router.get("/user/:tripId/:userId", getUserToOwnerPayment);
router.get("/from/:tripId/:userId", getFromMemberToUserPayment);

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// **Create UPI Payment Order**
// router.post("/pay", async (req, res) => {
//   try {
//     const { recipientId, amount } = req.body;
//     if (!recipientId || !amount) return res.status(400).json({ error: "Missing fields" });

//     // **Get Sender (Logged-in User)**
//     const sender = await User.findById(req.user.id);
//     if (!sender || !sender.upiId) return res.status(404).json({ error: "Sender UPI not found" });

//     // **Get Receiver (Recipient User)**
//     const receiver = await User.findById(recipientId);
//     if (!receiver || !receiver.upiId) return res.status(404).json({ error: "Receiver UPI not found" });

//     // **Create Payment Order**
//     const payment = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay needs amount in paise
//       currency: "INR",
//       method: "upi",
//       upi: { vpa: receiver.upiId },
//       receipt: `txn_${Date.now()}`,
//       notes: { sender: sender.upiId, receiver: receiver.upiId },
//     });

//     res.json({ success: true, orderId: payment.id, razorpayKey: RAZORPAY_KEY_ID });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Payment failed" });
//   }
// });

// This should be in your auth middleware
router.post("/pay", authMiddleware, async (req, res) => {
    try {
      const { recipientId, amount } = req.body;
      if (!recipientId || !amount) return res.status(400).json({ error: "Missing fields" });
  
      // Check if req.user exists
      if (!req.user || !req.user.id) {
        console.log("User not authenticated properly", req.user);
        return res.status(401).json({ error: "Authentication required" });
      }
  
      // Rest of your code...
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Payment failed" });
    }
  });

// **Webhook for Payment Status**
router.post("/razorpay-webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const secret = RAZORPAY_KEY_SECRET;
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (signature === expectedSignature) {
      console.log("Payment Verified:", req.body);
      res.json({ status: "Webhook Received" });
    } else {
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

export default router;