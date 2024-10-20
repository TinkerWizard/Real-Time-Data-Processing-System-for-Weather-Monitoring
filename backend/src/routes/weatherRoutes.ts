import express, {Request, Response} from 'express';
export const router = express.Router();
import { fetchWeatherData, fetchWeatherForecast, getWeatherData, createAlert } from '../controllers/weatherController';

// let weatherData: any = null;
// setInterval(async () => {
//     try {
//       weatherData = await fetchWeatherData;
//       console.log('Weather data updated:', weatherData);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   }, 600000);  // 10 minutes
  
//   router.get('/fetch', (req: Request, res: Response) => {
//     if (weatherData) {
//       res.status(200).json({ message: 'Weather data fetched successfully', data: weatherData });
//     } else {
//       res.status(500).json({ message: 'Weather data not available' });
//     }
//   });

router.get('/fetch', fetchWeatherData);
router.get('/fetch-forecast', fetchWeatherForecast);
router.get('/data', getWeatherData);
router.post('/create-alert', createAlert);