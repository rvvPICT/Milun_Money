import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    upiId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
    }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;