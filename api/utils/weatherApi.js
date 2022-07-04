const { WEATHER } = require('./constants');

/**
 * Requests weather data from weather API
 * @param {float} lat - Latitude to look up
 * @param {float} lon - Longitude to look up
 * @param {string} units - One of standard, metric, imperial
 * @return {Promise} - Promise API JSON Data
 */
const weatherApi = async (lat, lon, units) => {
  const url = `${WEATHER.url}?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER.apiKey}`;
  const response = await fetch(url);
  return response.json();
};

module.exports = weatherApi;
