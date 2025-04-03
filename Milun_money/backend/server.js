// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import userPaymentRoutes from "./routes/userPaymentRoutes.js";
// import tripRoutes from "./routes/tripRoutes.js";
// import paymentRoutes from "./routes/paymentRouter.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

// console.log("🔄 Connecting to database...");
// await connectDB();
// console.log("✅ Database connected!");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/users", userRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/userPayments", userPaymentRoutes);
// app.use("/api/trips", tripRoutes);


// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log("MONGO_URI:", process.env.MONGO_URI);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'

dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth/users", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});