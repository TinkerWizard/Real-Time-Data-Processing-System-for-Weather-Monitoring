import axios from 'axios';
import WeatherReport from '../models/weatherReport';  // Assuming you have already converted the model to TS
import { calculateDominantCondition } from '../utils/weatherUtils';

interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    main: string;
  }>;
  dt: number;
  name: string;
}

interface Summary {
  date: string;
  totalTemp: number;
  maxTemp: number;
  minTemp: number;
  conditionCounts: { [key: string]: number };
  count: number;
}

// Function to fetch weather data for a specific city
const getWeatherData = async (city: string): Promise<WeatherData> => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

// Function to process weather data for multiple cities
export const processWeatherData = async (): Promise<void> => {
  const cities: string[] = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const summaries: { [key: string]: Summary } = {};

  for (const city of cities) {
    const data = await getWeatherData(city);
    const date = new Date(data.dt * 1000).toISOString().split('T')[0];
    const mainCondition = data.weather[0].main;
    const temp = data.main.temp;

    // Initialize the summary for the date if it doesn't exist
    if (!summaries[date]) {
      summaries[date] = {
        date,
        totalTemp: 0,
        maxTemp: -Infinity,
        minTemp: Infinity,
        conditionCounts: {},
        count: 0
      };
    }

    const summary = summaries[date];
    summary.totalTemp += temp;
    summary.maxTemp = Math.max(summary.maxTemp, temp);
    summary.minTemp = Math.min(summary.minTemp, temp);
    summary.conditionCounts[mainCondition] = (summary.conditionCounts[mainCondition] || 0) + 1;
    summary.count++;
  }

  // Process and save summaries
  for (const date in summaries) {
    const summary = summaries[date];
    const avgTemp = summary.totalTemp / summary.count;
    const dominantCondition = calculateDominantCondition(summary.conditionCounts);

    const weatherReport = new WeatherReport({
      date,
      avg_temp: avgTemp,
      max_temp: summary.maxTemp,
      min_temp: summary.minTemp,
      dominant_condition: dominantCondition
    });

    await weatherReport.save();
  }
};
