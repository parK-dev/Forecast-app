import request from 'postman-request';
import dotenv from 'dotenv/config';
import geocode from './utils/geocode.js';

// Weather
// const weatherKey = process.env.WEATHER_KEY;
// const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=Nagoya`;

// request({url: weatherUrl, json: true}, (error, response, body) => {
//   if (error) {
//     console.log('Unable to connect to weather service.');
//   } else if (body.error) {
//     console.log(`Error: ${body.error.info}`)
//   } else {
//     const wData = body.current
//     console.log(`${wData.weather_descriptions[0]}.The temperature in Nagoya is ${wData.temperature} degrees. There is ${wData.precip}% chance of precipitations.`);
//   }
// });

// Geocoding
// const mapKey = process.env.MAP_KEY;
// const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapKey}&limit=1`

// request({url: mapUrl, json: true}, (error, response, body) => {
//   if (error) {
//     console.log('Unable to connect to geolocation service.');
//   } else if (body.message) {
//     console.log(`Error: ${body.message}`)
//   } else {
//     const lat = body.features[0].center[1];
//     const lon = body.features[0].center[0];
//     console.log(`Latitude: ${lat} Longitude: ${lon}`);
//   }
// });

geocode('Nagoya', (error, data) => {
  console.log('Error:', error);
  console.log('Data:', data);
});
