const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    jobType: {
        type: String, // e.g., 'construction', 'plumbing', 'cleaning'
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the job agent
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the worker assigned to the job
    },
});

export const Job = mongoose.model('Job', jobSchema);
