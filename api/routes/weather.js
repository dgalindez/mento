const express = require('express');
const router = express.Router();

const { UNITS } = require('../utils/constants');
const validateLocation = require('../utils/validateLocation');
const validateUnits = require('../utils/validateUnits');

/**
 * @swagger
 * /weather:
 *  get:
 *    summary: Retreive weather data for current location
 *    description: Latitude and Longitude or ZIP and locale must be provided
 *    in: query
 *      name: lat
 *      schema:
 *        type: float
 *      description: Latitude of location to search for
 *    in: query
 *      name: lon
 *      schema:
 *        type: float
 *      description: Longitude of location to search for
 *    in: query
 *      name: zip
 *      schema:
 *        type: string
 *      description: ZIP code of location. Is translated to lat/lon
 *    in: query
 *      name: locale
 *      schema:
 *        type: string
 *      description: Locale for the ZIP code to be unique
 *    in: query
 *      name: units
 *      schema:
 *        type: string
 *        enum: [standard, metric, imperial]
 *      description: Locale for the ZIP code to be unique
 *    responses:
 *      200:
 *        description: Object containing weather data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                TODO:
 *                  type: string
 *                  description: Some TODO string
 *                  example: "SOME STRING"
  *
  */
router.get('/', function(req, res, _) {
  const { lat, lon, zip, locale, units = UNITS.standard } = req.query;

  const location = validateLocation(lat, lon);
  const validUnits = validateUnits(units);
  const isValidZip = !!zip;
  const isValidLocale = !!locale;

  let actualLat = location.lat;
  let actualLon = location.lon;

  if (!isValidZip && !location.isValid) {
      res.status(400).send("Lat and Lon or Zip and Locale are required");
      return;
  }

  if (!validUnits) {
      res.status(400).send("Units needs to be standard, metric or imperial");
      return;
  }

  if (isValidZip && !location.isValid) {
    if (!isValidLocale) {
      res.status(400).send("Locale is required");
      return;
    }
    // TODO: Make Maps API call to get lat/lon, use zip, locale
    // update actualLat and actualLon
  }

  // TODO: Make API call using actualLat, actualLon, units

  res.status(200).send("Ok");
});

module.exports = router;
