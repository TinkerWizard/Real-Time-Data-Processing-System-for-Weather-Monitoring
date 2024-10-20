import { Schema, model } from 'mongoose';

// Create the schema for alerts
const AlertSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email validation
    },
    threshold: { 
        type: Number, 
        required: true 
    },
    condition: {
        type: String,
        enum: ['below', 'above'],  // Only allow 'below' or 'above' for now
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

export const Alert = model('Alert', AlertSchema);
