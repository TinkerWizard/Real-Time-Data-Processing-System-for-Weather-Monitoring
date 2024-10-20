import express, {Request, Response} from 'express';
export const router = express.Router();
import { fetchWeatherData, fetchWeatherForecast, getWeatherData, createAlert } from '../controllers/weatherController';



router.get('/fetch', fetchWeatherData);
router.get('/fetch-forecast', fetchWeatherForecast);
router.get('/data', getWeatherData);
router.get('/create-alert', createAlert);