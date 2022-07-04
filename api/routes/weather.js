const express = require('express');
const router = express.Router();

const { UNITS, ERRORS } = require('../utils/constants');

const cleanData = require('../utils/cleanData');
const locationApi = require('../utils/locationApi');
const validateLocation = require('../utils/validateLocation');
const validateUnits = require('../utils/validateUnits');
const weatherApi = require('../utils/weatherApi');

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
 *      400:
 *        description: Request failed validations
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error describing the failed validations
 *                  example: "lat and lon or zip and locale are required"
 *
 */
router.get('/', async (req, res, _) => {
  const {
    lat,
    lon,
    zip,
    locale,
    units = UNITS.standard,
  } = req?.query ?? {};

  const location = validateLocation(lat, lon);
  const validUnits = validateUnits(units);
  const isValidZip = !!zip;
  const isValidLocale = !!locale;

  let actualLat = location.lat;
  let actualLon = location.lon;

  if (!isValidZip && !location.isValid) {
    res.status(400).json({ error: ERRORS.weather.noParams });
    return;
  }

  if (!validUnits) {
    res.status(400).json({ error: ERRORS.weather.units });
    return;
  }

  if (isValidZip && !location.isValid) {
    if (!isValidLocale) {
      res.status(400).json({ error: ERRORS.weather.locale });
      return;
    }

    try {
      const data = await locationApi(zip, locale);

      if (!data?.postalcodes?.length) {
        res.status(500).json({ error: ERRORS.weather.locationApi });
        return;
      }

      actualLat = data.postalcodes[0].lat;
      actualLon = data.postalcodes[0].lng;
    } catch {
      res.status(500).json({ error: ERRORS.weather.locationApi });
      return;
    };
  }

  try {
    const data = await weatherApi(actualLat, actualLon, units);
    res.status(200).json(cleanData(data));
  } catch {
    res.status(500).json({ error: ERRORS.weather.weatherApi });
  };
});

module.exports = router;
