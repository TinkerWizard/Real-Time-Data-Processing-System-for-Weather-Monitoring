import './App.css';
import { useEffect, useState } from 'react';
import { Box, ButtonGroup, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { WeatherReport } from './models/WeatherReport'
import { Visualization } from './components/Visualization';
import { Alert } from './components/Alert';
function App() {
  const [delhiWeather, setDelhiWeather] = useState<WeatherReport>();
  const [mumbaiWeather, setMumbaiWeather] = useState<WeatherReport>();
  const [chennaiWeather, setChennaiWeather] = useState<WeatherReport>();
  const [bengaluruWeather, setBengaluruWeather] = useState<WeatherReport>();
  const [hyderabadWeather, setHyderabadWeather] = useState<WeatherReport>();
  const [kolkataWeather, setKolkataWeather] = useState<WeatherReport>();
  const [currentCityWeather, setCurrentCityWeather] = useState<WeatherReport>();
  const [view, setView] = useState<string>('Delhi');
  const handleCityClick = (city: string, weatherData: WeatherReport) => {
    setView(city);
    localStorage.setItem("city", city);
    setCurrentCityWeather(weatherData);
  };
  useEffect(() => {
    localStorage.setItem("city", "Delhi");
  }, []);
  useEffect(() => {
    async function fetchWeatherReport() {
      const response = await fetch(`http://localhost:3000/fetch`);
      const data = await response.json();
      if (response.ok) {
        setDelhiWeather(data.delhiData);
        setMumbaiWeather(data.mumbaiData);
        setChennaiWeather(data.chennaiData);
        setBengaluruWeather(data.bangaloreData);
        setHyderabadWeather(data.hyderabadData);
        setKolkataWeather(data.kolkataData);

        setCurrentCityWeather(data.delhiData);
      }
    }
    fetchWeatherReport();
  }, []);

  const [currentTempUnit, setCurrentTempUnit] = useState<string>('Celsius');
  const [temp, setTemp] = useState<number>(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState<number>(0);
  useEffect(() => {
    setCurrentTempUnit("Celsius");
    if (currentCityWeather?.mainTemp !== undefined) {
      setTemp(currentCityWeather.mainTemp); // Update temp when currentCityWeather changes
    }
    if (currentCityWeather?.mainFeelsLike !== undefined) {
      setFeelsLikeTemp(currentCityWeather.mainFeelsLike);
    }
  }, [currentCityWeather]);
  const handleTempUnitChange = (unit: string) => {
    if (unit == "Kelvin" && currentTempUnit == "Celsius") {
      setTemp(temp + 273.15);
      setFeelsLikeTemp(temp + 273.15);
      setCurrentTempUnit(unit);
    }
    else if (unit == "Kelvin" && currentTempUnit == "Fahrenheit") {
      setTemp((5 / 9 * (temp - 32)) + 273.15);
      setFeelsLikeTemp((5 / 9 * (temp - 32)) + 273.15);
      setCurrentTempUnit(unit);
    }
    else if (unit == "Celsius" && currentTempUnit == "Kelvin") {
      setTemp(temp - 273.15);
      setFeelsLikeTemp(temp - 273.15);
      setCurrentTempUnit(unit);
    }
    else if (unit == "Celsius" && currentTempUnit == "Fahrenheit") {
      setTemp(5 / 9 * (temp - 32));
      setFeelsLikeTemp(5 / 9 * (temp - 32));
      setCurrentTempUnit(unit);
    }
    else if (unit == "Fahrenheit" && currentTempUnit == "Celsius") {
      setTemp((9 / 5 * temp) + 32);
      setFeelsLikeTemp((9 / 5 * temp) + 32);
      setCurrentTempUnit(unit);
    }
    else if (unit == "Fahrenheit" && currentTempUnit == "Kelvin") {
      setTemp((9 / 5 * (temp - 273.15)) + 32);
      setFeelsLikeTemp((9 / 5 * (temp - 273.15)) + 32);
      setCurrentTempUnit(unit);
    }

  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='d-flex justify-content-center align-items-center flex-column gap-5' style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center">
        <ButtonGroup>
          <Button
            onClick={() => delhiWeather && handleCityClick('Delhi', delhiWeather)}
            variant={view === "Delhi" ? "contained" : "outlined"}
          >
            Delhi
          </Button>
          <Button
            onClick={() => mumbaiWeather && handleCityClick('Mumbai', mumbaiWeather)}
            variant={view === "Mumbai" ? "contained" : "outlined"}
          >
            Mumbai
          </Button>
          <Button
            onClick={() => chennaiWeather && handleCityClick('Chennai', chennaiWeather)}
            variant={view === "Chennai" ? "contained" : "outlined"}
          >
            Chennai
          </Button>
          <Button
            onClick={() => bengaluruWeather && handleCityClick('Bengaluru', bengaluruWeather)}
            variant={view === "Bengaluru" ? "contained" : "outlined"}
          >
            Bengaluru
          </Button>
          <Button
            onClick={() => hyderabadWeather && handleCityClick('Hyderabad', hyderabadWeather)}
            variant={view === "Hyderabad" ? "contained" : "outlined"}
          >
            Hyderabad
          </Button>
          <Button
            onClick={() => kolkataWeather && handleCityClick('Kolkata', kolkataWeather)}
            variant={view === "Kolkata" ? "contained" : "outlined"}
          >
            Kolkata
          </Button>
        </ButtonGroup>
      </Box>
      <div className='d-flex gap-5' style={{ width: "vh-100" }}>
        {currentCityWeather &&
          <div>
            <div className=''>
              <div>
                <div className='container p-2 d-flex flex-column justify-content-center align-items-start'>
                  <h2>{currentCityWeather.name}</h2>
                  <h4>{temp} {currentTempUnit}</h4>
                  <h6>Feels like: {feelsLikeTemp} {currentTempUnit}</h6>
                  <p>{currentCityWeather.weatherMain}</p>
                  <p>{currentCityWeather.date}</p>
                </div>
                <div className='container p-2 d-flex flex-column justify-content-center align-items-start'>
                  <p>Humidity: {currentCityWeather.mainHumidity} %</p>
                  <p>Wind Speed: {currentCityWeather.windSpeed} Km/hr</p>
                  <p>Min Temp: {currentCityWeather.mainTempMin}</p>
                  <p>Max Temp: {currentCityWeather.mainTempMax}</p>
                  <p>Avg Temp: {currentCityWeather.avgTemp}</p>
                </div>
              </div>
            </div>
          </div>
        }
        <div className='' style={{ width: "800px", height: '400px' }}>
          <Visualization />
        </div>
      </div>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Temperature Unit</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={currentTempUnit}
          name="row-radio-buttons-group"
          defaultValue="Celsius"
        >
          <FormControlLabel value="Celsius" control={<Radio onChange={(e) => handleTempUnitChange(e.target.value)} />} label="Celsius" />
          <FormControlLabel value="Kelvin" control={<Radio onChange={(e) => handleTempUnitChange(e.target.value)} />} label="Kelvin" />
          <FormControlLabel value="Fahrenheit" control={<Radio onChange={(e) => handleTempUnitChange(e.target.value)} />} label="Fahrenheit" />
        </RadioGroup>
      </FormControl>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Set Alert
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
          <Alert />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
