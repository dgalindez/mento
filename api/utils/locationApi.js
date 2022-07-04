const { LOCATION } = require('./constants');

/**
 * Requests location data from Maps API
 * @param {string} zip - ZIP Code to search for
 * @param {string} locale - locale to guarantee ZIP uniqueness
 * @return {Promise} - Promise API JSON Data
 */
const locationApi = async (zip, locale) => {
  const url = `${LOCATION.url}?postalcode=${zip}&country=${locale}&username=${LOCATION.username}`;
  const response = await fetch(url);
  return response.json();
};

module.exports = locationApi;
