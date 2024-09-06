import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
dotenv.config({});

const app = express();
const PORT = process.env.PORT||9000;
app.use(express.json());
app.use(cookieParser());

// Routes 
app.use("/api/v1/user",userRoute);
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on port 8000"); 
})