import express, { Request, Response } from 'express';
import { Alert } from '../models/alert'; // Your Mongoose model

const router = express.Router();

router.post('/create-alert', async (req: Request, res: Response) => {
    const { email, constraints } = req.body;

    try {
        const newAlert = new Alert({ email, constraints });
        await newAlert.save();
        res.status(201).json({ message: 'Alert created successfully', alert: newAlert });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
