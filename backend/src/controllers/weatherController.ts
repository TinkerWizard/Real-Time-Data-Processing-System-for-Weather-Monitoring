import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { Request, Response } from "express";
import WeatherReport from "../models/weatherReport";
import { Alert } from "../models/alert";
import { startAlertSystem } from "../utils/alert";
const cities: string[] = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];
interface WeatherMain {
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface WeatherItem {
  main: WeatherMain;
  dt_txt: string;
}

interface City {
  name: string;
  country: string;
}
interface WeatherResponse {
  list: WeatherItem[];
  city: City;
}
interface CityTemp {
  city: string;
  temp: number[]; // Array of numbers for temperature values
  min: number[];  // Array of numbers for minimum temperature values
  max: number[];  // Array of numbers for maximum temperature values
}

export const fetchWeatherData = async (
  req: Request,
  res: Response
): Promise<void> => {
  startAlertSystem(5);
  try {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const weatherPromises = cities.map((city) =>
      axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      })
    );

    // Resolve all promises concurrently
    const responses = await Promise.all(weatherPromises);
    const dateString = new Date(responses[0].data.dt * 1000);
    const readableDate = new Date(dateString).toLocaleString();
    const allData = responses.map((response) => response.data); // Extract the data from each response
    for (const cityData of allData) {
      const weatherReport = new WeatherReport({
        city: cityData.name, // City name
        main: cityData.weather[0].main, // Main weather condition (e.g., Clear, Clouds)
        temp_celsius: cityData.main.temp, // Current temperature
        feels_like_celsius: cityData.main.feels_like, // Feels like temperature
        dt: new Date(cityData.dt * 1000), // Convert Unix timestamp to Date object
        dominant_condition: cityData.weather[0].description, // Description of weather (e.g., clear sky)
        min_temp_celsius: cityData.main.temp_min, // Minimum temperature
        max_temp_celsius: cityData.main.temp_max, // Maximum temperature
        avg_temp_celsius: (cityData.main.temp_min + cityData.main.temp_max) / 2, // Average temperature (simple avg)
        date: new Date(), // Current date when the data is saved
      });

      await weatherReport.save(); // Save the report to the database
    }
    const delhiData = {
      name: responses[0].data.name,
      weatherMain: responses[0].data.weather[0].main,
      weatherIcon: responses[0].data.weather[0].icon,
      mainFeelsLike: responses[0].data.main.feels_like,
      mainTemp: responses[0].data.main.temp,
      date: readableDate,
      mainTempMin: responses[0].data.main.temp_min,
      mainTempMax: responses[0].data.main.temp_max,
      mainHumidity: responses[0].data.main.humidity,
      windSpeed: responses[0].data.wind.speed,
      avgTemp:
        (responses[0].data.main.temp_min +
          responses[0].data.main.temp_max +
          responses[0].data.main.temp) /
        3,
    };

    const mumbaiData = {
      name: responses[1].data.name,
      weatherMain: responses[1].data.weather[0].main,
      weatherIcon: responses[1].data.weather[0].icon,
      mainFeelsLike: responses[1].data.main.feels_like,
      mainTemp: responses[1].data.main.temp,
      date: readableDate,
      mainTempMin: responses[1].data.main.temp_min,
      mainTempMax: responses[1].data.main.temp_max,
      mainHumidity: responses[1].data.main.humidity,
      windSpeed: responses[1].data.wind.speed,
      avgTemp:
        (responses[1].data.main.temp_min +
          responses[1].data.main.temp_max +
          responses[1].data.main.temp) /
        3,
    };

    const chennaiData = {
      name: responses[2].data.name,
      weatherMain: responses[2].data.weather[0].main,
      weatherIcon: responses[2].data.weather[0].icon,
      mainFeelsLike: responses[2].data.main.feels_like,
      mainTemp: responses[2].data.main.temp,
      date: readableDate,
      mainTempMin: responses[2].data.main.temp_min,
      mainTempMax: responses[2].data.main.temp_max,
      mainHumidity: responses[2].data.main.humidity,
      windSpeed: responses[2].data.wind.speed,
      avgTemp:
        (responses[2].data.main.temp_min +
          responses[2].data.main.temp_max +
          responses[2].data.main.temp) /
        3,
    };

    const bangaloreData = {
      name: responses[3].data.name,
      weatherMain: responses[3].data.weather[0].main,
      weatherIcon: responses[3].data.weather[0].icon,
      mainFeelsLike: responses[3].data.main.feels_like,
      mainTemp: responses[3].data.main.temp,
      date: readableDate,
      mainTempMin: responses[3].data.main.temp_min,
      mainTempMax: responses[3].data.main.temp_max,
      mainHumidity: responses[3].data.main.humidity,
      windSpeed: responses[3].data.wind.speed,
      avgTemp:
        (responses[3].data.main.temp_min +
          responses[3].data.main.temp_max +
          responses[3].data.main.temp) /
        3,
    };

    const kolkataData = {
      name: responses[4].data.name,
      weatherMain: responses[4].data.weather[0].main,
      weatherIcon: responses[4].data.weather[0].icon,
      mainFeelsLike: responses[4].data.main.feels_like,
      mainTemp: responses[4].data.main.temp,
      date: readableDate,
      mainTempMin: responses[4].data.main.temp_min,
      mainTempMax: responses[4].data.main.temp_max,
      mainHumidity: responses[4].data.main.humidity,
      windSpeed: responses[4].data.wind.speed,
      avgTemp:
        (responses[4].data.main.temp_min +
          responses[4].data.main.temp_max +
          responses[4].data.main.temp) /
        3,
    };

    const hyderabadData = {
      name: responses[5].data.name,
      weatherMain: responses[5].data.weather[0].main,
      weatherIcon: responses[5].data.weather[0].icon,
      mainFeelsLike: responses[5].data.main.feels_like,
      mainTemp: responses[5].data.main.temp,
      date: readableDate,
      mainTempMin: responses[5].data.main.temp_min,
      mainTempMax: responses[5].data.main.temp_max,
      mainHumidity: responses[5].data.main.humidity,
      windSpeed: responses[5].data.wind.speed,
      avgTemp:
        (responses[5].data.main.temp_min +
          responses[5].data.main.temp_max +
          responses[5].data.main.temp) /
        3,
    };

    res.status(200).json({
      message: "Weather data fetched successfully",
      delhiData,
      mumbaiData,
      chennaiData,
      bangaloreData,
      hyderabadData,
      kolkataData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const fetchWeatherForecast = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const forecastPromises = cities.map((city) =>
      axios.get<WeatherResponse>('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
      })
    );

    // Resolve all promises concurrently
    const responses = await Promise.all(forecastPromises);
    // Extract the forecast for Delhi
    const delhiForecast = responses.find(response => response.data.city.name === "Delhi");

    if (!delhiForecast) {
      res.status(404).json({ error: 'Forecast for Delhi not found' });
      return;
    }

    const mumbaiForecast = responses.find(response => response.data.city.name === "Mumbai");

    if (!mumbaiForecast) {
      res.status(404).json({ error: 'Forecast for Mumbai not found' });
      return;
    }
    const chennaiForecast = responses.find(response => response.data.city.name === "Chennai" );

    if (!chennaiForecast) {
      res.status(404).json({ error: 'Forecast for Chennai not found' });
      return;
    }
    const bengaluruForecast = responses.find(response => response.data.city.name === "Bengaluru");

    if (!bengaluruForecast) {
      res.status(404).json({ error: 'Forecast for Bengaluru not found' });
      return;
    }
    const hyderabadForecast = responses.find(response => response.data.city.name === "Hyderabad");

    if (!hyderabadForecast) {
      res.status(404).json({ error: 'Forecast for Hyderabad not found' });
      return;
    }
    const kolkataForecast = responses.find(response => response.data.city.name === "Kolkata");

    if (!kolkataForecast) {
      res.status(404).json({ error: 'Forecast for Kolkata not found' });
      return;
    }


    // Initialize the delhiTemp structure with explicit typing
    const delhiTemp: CityTemp = {
      city: "Delhi",
      temp: [],
      min: [],
      max: [],
    };
    const mumbaiTemp: CityTemp = {
      city: "Mumbai",
      temp: [],
      min: [],
      max: [],
    };
    const chennaiTemp: CityTemp = {
      city: "Chennai",
      temp: [],
      min: [],
      max: [],
    };
    const bengaluruTemp: CityTemp = {
      city: "Bengaluru",
      temp: [],
      min: [],
      max: [],
    };
    const hyderabadTemp: CityTemp = {
      city: "Hyderabad",
      temp: [],
      min: [],
      max: [],
    };
    const kolkataTemp: CityTemp = {
      city: "Kolkata",
      temp: [],
      min: [],
      max: [],
    };

    // Iterate over the list to populate temp, min, and max arrays
    delhiForecast.data.list.forEach((item) => {
      delhiTemp.temp.push(item.main.temp);
      delhiTemp.min.push(item.main.temp_min);
      delhiTemp.max.push(item.main.temp_max);
    });

    mumbaiForecast.data.list.forEach((item) => {
      mumbaiTemp.temp.push(item.main.temp);
      mumbaiTemp.min.push(item.main.temp_min);
      mumbaiTemp.max.push(item.main.temp_max);
    });

    chennaiForecast.data.list.forEach((item) => {
      chennaiTemp.temp.push(item.main.temp);
      chennaiTemp.min.push(item.main.temp_min);
      chennaiTemp.max.push(item.main.temp_max);
    });

    bengaluruForecast.data.list.forEach((item) => {
      bengaluruTemp.temp.push(item.main.temp);
      bengaluruTemp.min.push(item.main.temp_min);
      bengaluruTemp.max.push(item.main.temp_max);
    });

    hyderabadForecast.data.list.forEach((item) => {
      hyderabadTemp.temp.push(item.main.temp);
      hyderabadTemp.min.push(item.main.temp_min);
      hyderabadTemp.max.push(item.main.temp_max);
    });

    kolkataForecast.data.list.forEach((item) => {
      kolkataTemp.temp.push(item.main.temp);
      kolkataTemp.min.push(item.main.temp_min);
      kolkataTemp.max.push(item.main.temp_max);
    });


    // Send the structured temperature data back to the client
    res.status(200).json({ delhiTemp, mumbaiTemp, chennaiTemp, bengaluruTemp, hyderabadTemp, kolkataTemp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
};

// Get weather data from MongoDB
export const getWeatherData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const weatherData = await WeatherReport.find();
    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
export const createAlert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, threshold, condition, city } = req.body;

    console.log(email, threshold, condition, city);

    // Use findOneAndUpdate to check if the email already exists and update or create a new record
    const updatedAlert = await Alert.findOneAndUpdate(
      { email },  // Search by email
      { threshold, condition, city },  // Update the threshold, condition, and city
      { new: true, upsert: true, useFindAndModify: false }  // Create a new record if it doesn't exist
    );

    // Send a success response
    res.status(201).json({ message: 'Alert created/updated successfully', alert: updatedAlert });
  } catch (error: any) {
    // Handle any errors that occur
    res.status(500).json({ message: 'Failed to create or update alert', error: error.message });
  }
};