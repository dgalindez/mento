const { UNITS } = require('../utils/constants');

/**
 * Checks that units is one of standard, metric or imperial
 * @param {string} units - Unit string value
 * @return {boolean} - Whether or not units is a valid one
 */
const validateUnits = (units) =>
  Object.keys(UNITS).some((unit) => UNITS[unit] === units);

module.exports = validateUnits;
