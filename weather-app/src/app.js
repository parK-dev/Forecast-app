/* eslint-disable no-undef */
import geocode from '../utils/geocode.js';
import forecast from '../utils/forecast.js';
import express from 'express';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

// Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine views and location
app.set('view engine', 'hbs'); // set template engine for Express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //set HTML path for static pages.


// Route handlers

app.get('', (req, res) => {
  res.render('index');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('*', (req, res) => {
  res.send('My 404 page');
});

app.listen(port, () => {
  
});
