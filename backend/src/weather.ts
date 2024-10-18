import axios from 'axios';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;  // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

export const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'  // Use 'metric' for Celsius or 'imperial' for Fahrenheit
      }
    });
    
    const { main, weather, name } = response.data;
    console.log(`Weather in ${name}:`);
    console.log(`Temperature: ${main.temp}°C`);
    console.log(`Feels Like: ${main.feels_like}°C`);
    console.log(`Weather Condition: ${weather[0].description}`);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
