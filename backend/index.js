import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT||9000;
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on port 8000"); 
})