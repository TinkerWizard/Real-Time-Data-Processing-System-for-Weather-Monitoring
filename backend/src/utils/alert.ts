import { Alert } from "../models/alert";
import sgMail from '@sendgrid/mail';
import axios from 'axios';

// Replace with your SendGrid API key
const sendGridApi = process.env.SENDGRID_MAIL_API_KEY;
sgMail.setApiKey(sendGridApi ?? "");

// Replace with your weather API key and base URL
const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function checkAndSendAlerts() {
  try {
    const alerts = await Alert.find({});

    for (const alert of alerts) {
      const { email, threshold, condition, city } = alert;

      // Fetch current temperature for the city
      const response = await axios.get(WEATHER_API_BASE_URL, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: 'metric' // Use Celsius
        }
      });

      const currentTemp = response.data.main.temp;

      // Check if the alert condition is met
      let isAlertTriggered = false;
      if (condition === 'above' && currentTemp > threshold) {
        isAlertTriggered = true;
      } else if (condition === 'below' && currentTemp < threshold) {
        isAlertTriggered = true;
      }

      if (isAlertTriggered) {
        // Send email alert
        const msg = {
          to: email,
          from: 'tinkerwizardry@gmail.com', // Replace with your SendGrid verified sender
          subject: `Temperature Alert for ${city}`,
          text: `The current temperature in ${city} is ${currentTemp}°C, which is ${condition} your set threshold of ${threshold}°C.`,
          html: `<strong>The current temperature in ${city} is ${currentTemp}°C, which is ${condition} your set threshold of ${threshold}°C.</strong>`,
        };

        await sgMail.send(msg);
        console.log(`Alert sent to ${email} for ${city}`);
      }
    }
  } catch (error) {
    console.error('Error checking and sending alerts:', error);
  }
}

// Function to start the alert checking interval
export function startAlertSystem(intervalMinutes = 5) {
  // Run immediately on start
  checkAndSendAlerts();

  // Then run at specified interval
  setInterval(checkAndSendAlerts, intervalMinutes * 60 * 1000);
}

startAlertSystem(5);