const mongoose = require("mongoose");
const { isDate } = require("validator");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            maxlength: 30,
            required: [true, "Name is required"],
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            validate: {
                validator: (value) => isDate(value),
                message: "Invalid date format",
            },
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [20, "Username cannot exceed 20 characters"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 6 characters"],
            maxlength: [128, "Password cannot exceed 128 characters"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
