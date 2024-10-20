import { Schema, model, Document } from 'mongoose';

// Define the constraint interface
interface IConstraint {
    type: string;        // e.g., 'temperature', 'wind speed', 'humidity'
    threshold: number;   // e.g., 20 (for temperature threshold)
    condition: string;   // e.g., 'below', 'above', etc.
    city: string;
}

// Define the alert interface
interface IAlert extends Document {
    email: string;
    constraints: IConstraint[];  // An array of constraints
}

// Create the schema for constraints
const ConstraintSchema = new Schema<IConstraint>({
    type: { 
        type: String, 
        required: true 
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

// Create the schema for alerts
const AlertSchema = new Schema<IAlert>({
    email: {
        type: String,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email validation
    },
    constraints: {
        type: [ConstraintSchema],  // Array of constraints
        required: true
    }
});

export const Alert = model<IAlert>('Alert', AlertSchema);
