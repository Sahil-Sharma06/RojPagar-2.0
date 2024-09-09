import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullname, username, phone, password, confirmPassword, role, jobType, location } = req.body;

        if (!fullname || !username || !phone || !password || !confirmPassword || !role || !jobType || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            username,
            phone,
            password: hashedPassword,
            role,
            jobType,
            location
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error during registration:', error);

        return res.status(500).json({ message: "An error occurred during registration." });
    }
};

export const login = async (req,res)=>{
    try {
        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({message:"All fields are required."});
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"User not found.",success:false})
            
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if(!isPasswordMatched){
            return res.status(400).json({message:"Invalid Passwords!",success:false})
        }

        const tokenData = {
           userId: user._id
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            _id:user._id,
            username:user.username,
        })
    } catch (error) {
        console.log(error);
        
    }
}