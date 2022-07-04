const { ERRORS } = require('../utils/constants');

/**
 * @typedef {Object} ApiError
 * @property {string} error - Actual error message
 * @property {string} errorKey - Path to error in Constants (used by UI)
 */

/**
 * Builds an error with key and message using existing constants
 * @param {string} path - Path to actual message, will be used as key
 * @return {ApiError}
 */
const buildError = (path = '') => {
  const [root = '', key = ''] = path?.split('.');
  return {
    error: ERRORS?.[root]?.[key] ?? '',
    errorKey: path,
  }
};

module.exports = buildError;
