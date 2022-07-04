/** @namespace Validators */

/**
 * @typedef {Object} Location
 * @property {number} lat - Latitude as float
 * @property {number} lon - Longitude as float
 * @property {boolean} isValid - Whether or not lat and lon are valid floast
 * @inner
 */

/**
 * Checks that lat and lon are valid floats
 * Since we are using parseFloat, as long as the start of the value
 * "looks" like a float, it will consider it valid
 * @param {string} lat - Latitude as string
 * @param {string} lon - Longitude as string
 * @return {Location}
 */
const validateLocation = (lat, lon) => {
  const parsedLat = Number.parseFloat(lat);
  const parsedLon = Number.parseFloat(lon);
  return {
    lat: parsedLat,
    lon: parsedLon,
    isValid: !Number.isNaN(parsedLat) && !Number.isNaN(parsedLon),
  }
};

module.exports = validateLocation;
