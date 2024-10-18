import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { getWeatherData } from "./weather";
import cors from 'cors';
import { connectDB } from "./config/db";
import { fetchWeatherData } from "./controllers/weatherController";
import { router }  from './routes/weatherRoutes'
const app = express();
const port = 3000;

connectDB();
app.use(express.json());
app.use(cors()); 

app.use(router);
// Middleware to parse JSON

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
