import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js' ;
import tripRoutes from './routes/tripRoutes.js' ;
import userPayment from './routes/userPaymentRoutes.js' ;

dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/projects", projectRoutes);
app.use("/api/auth/users", authRoutes);
app.use("/api/trips" , tripRoutes) ;
//app.use("api/userpayment" , userPayment) ;

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});

