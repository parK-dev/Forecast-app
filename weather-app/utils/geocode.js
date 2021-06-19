import request from 'postman-request';

const geocode = (address, callback) => {
  // Encode URI Component allows for special characters to be queried without the program crashing
  const mapKey = process.env.MAP_KEY;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapKey}&limit=1`

  request({url: url, json: true}, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.message) {
      callback(`Error: ${body.message}`, undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
};

export default geocode;