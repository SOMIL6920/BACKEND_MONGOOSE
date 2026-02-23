import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user",
            "admin"],
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    verficationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    }
})