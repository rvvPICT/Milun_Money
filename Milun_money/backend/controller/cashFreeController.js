import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg/orders";

export const createOrder = async (req, res) => {
    try {
        const { amount, customerId, customerPhone, customerEmail } = req.body;

        const response = await axios.post(
            `${CASHFREE_BASE_URL}/orders`,
            {
                order_amount: amount,
                order_currency: "INR",
                customer_details: {
                    customer_id: customerId,
                    customer_email: customerEmail,
                    customer_phone: customerPhone
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-client-id": CASHFREE_APP_ID,
                    "x-client-secret": CASHFREE_SECRET_KEY
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};
