/* eslint-disable no-undef */
import geocode from '../utils/geocode.js';
import forecast from '../utils/forecast.js';
import express from 'express';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

const app = express();

//Define paths for Express config
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine views and location
app.set('view engine', 'hbs'); // set template engine for Express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //set HTML files for routes

app.get('', (req, res) => {
  res.render('index', {
    title: 'A Weather App',
    author: 'parK-dev'
  });
});
app.listen(3000, () => {
  
}); // set port

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
