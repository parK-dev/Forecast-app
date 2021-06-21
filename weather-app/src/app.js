/* eslint-disable no-undef */
import geocode from '../utils/geocode.js';
import forecast from '../utils/forecast.js';

const address = process.argv[2];
if(!address) {
  console.log('Please provide a location.');
} else {
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return console.log(error)
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return console.log('Error:', error);
        } else {
          console.log(location);
          console.log(forecastData);
        }
      });
    }
  });
}
