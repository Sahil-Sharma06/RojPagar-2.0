import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname:{
        type: 'string',
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['worker', 'job_agent'],
        required: true,
    },
    jobType: {
        type: [String],  // Array of job types the user is interested in
    },
    location: {
            type: String,
            required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    }
},
{timestamps: true}
);

export const User = mongoose.model('User', userSchema);
