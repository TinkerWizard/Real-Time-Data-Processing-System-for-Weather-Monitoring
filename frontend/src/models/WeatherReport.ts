export class WeatherReport {
    weatherMain: string;
    weatherIcon: string;
    mainFeelsLike: number; // Changed to number for temperature values
    mainTemp: number; // Current temperature
    mainTempMin: number; // Minimum temperature
    mainTempMax: number; // Maximum temperature
    avgTemp: number;
    mainHumidity: number; // Humidity percentage
    windSpeed: number; // Wind speed
    date: number; // Timestamp of the weather data
    name: string; // City name

    constructor(
        weatherMain: string,
        weatherIcon: string,
        mainFeelsLike: number,
        mainTemp: number,
        mainTempMin: number,
        mainTempMax: number,
        mainHumidity: number,
        windSpeed: number,
        date: number,
        name: string,
        avgTemp: number
    ) {
        this.weatherMain = weatherMain;
        this.weatherIcon = weatherIcon;
        this.mainFeelsLike = mainFeelsLike;
        this.mainTemp = mainTemp;
        this.mainTempMin = mainTempMin;
        this.mainTempMax = mainTempMax;
        this.mainHumidity = mainHumidity;
        this.windSpeed = windSpeed;
        this.date = date;
        this.name = name;
        this.avgTemp = avgTemp;
    }
}
