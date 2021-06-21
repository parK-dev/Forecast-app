/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import request from "postman-request";
import dotenv from 'dotenv/config';

const forecast = (lat, lon, callback) => {
  const key = process.env.WEATHER_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${lon}`;

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback(`Error: ${body.error.info}`, undefined);
    } else {
      const data = body.current;
      callback(undefined, `\n${data.weather_descriptions[0]}.
                            \nThe temperature is ${data.temperature} degrees.
                            \nThere is ${data.precip}% chance of precipitations.`);
    }
  });
};



export default forecast;
