const express = require('express');
const router = express.Router();

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
  res.status(200).send("Ok");
});

module.exports = router;
