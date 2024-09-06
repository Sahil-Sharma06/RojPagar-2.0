import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, username, phone, password, confirmPassword, role, jobType, location } = req.body;

        // Check if all fields are provided
        if (!fullname || !username || !phone || !password || !confirmPassword || !role || !jobType || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if password matches confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            fullname,
            username,
            phone,
            password: hashedPassword,
            role,
            jobType,
            location
        });

        // Respond with success message
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Log error for debugging
        console.error('Error during registration:', error);

        // Send error response
        return res.status(500).json({ message: "An error occurred during registration." });
    }
};
