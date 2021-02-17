const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e9ed2c85248cc2da7eb941d91721b52d/" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude) +
    "";
  //request({ url, json: true }, (error, { body }) =>
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degrees out. There is a " +
          response.body.currently.precipProbability +
          "% chance of rain." +
          " Maximum Temp: " +
          response.body.daily.data[0].temperatureHigh +
          " || " +
          "Minimum Temp: " +
          response.body.daily.data[0].temperatureLow + ". " +
          "HUMIDITY : " + response.body.currently.humidity + " | " +
          "VISIBILITY : " + response.body.currently.visibility + "."

      );
    }
  });
};

module.exports = forecast;
