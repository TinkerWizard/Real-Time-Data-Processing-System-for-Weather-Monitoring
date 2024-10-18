import { Schema, model, Document } from 'mongoose';

// 1. Define an interface for the WeatherReport schema
interface IWeatherReport extends Document {
  city: string;
  main: string;
  temp_celsius: number;
  feels_like_celsius: number;
  dt: Date;
  dominant_condition: string;
  min_temp_celsius: number;
  max_temp_celsius: number;
  avg_temp_celsius: number;
  date: Date;
}

// 2. Define the WeatherReport schema using the interface
const WeatherReportSchema: Schema = new Schema<IWeatherReport>({
  city: { type: String, required: true },
  main: { type: String, required: true },
  temp_celsius: { type: Number, required: true },
  feels_like_celsius: { type: Number, required: true },
  dt: { type: Date, required: true },
  dominant_condition: { type: String, required: true },
  min_temp_celsius: { type: Number, required: true },
  max_temp_celsius: { type: Number, required: true },
  avg_temp_celsius: { type: Number, required: true },
  date: { type: Date, required: true }
});

// 3. Create and export the model
const WeatherReport = model<IWeatherReport>('WeatherReport', WeatherReportSchema);

export default WeatherReport;
