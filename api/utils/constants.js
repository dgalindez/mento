// Units used by Weather API
const UNITS = {
  standard: 'standard',
  metric: 'metric',
  imperial: 'imperial',
};

// Errors returned by routes
const ERRORS = {
  weatherApi: {
    locale: 'locale is required',
    localeKey: 'weatherApi.locale',
    locationApi: 'Could not get lat/lon for ZIP and locale provided',
    locationApiKey: 'weatherApi.locationApi',
    noParams: 'lat and lon or zip and locale are required',
    noParamsKey: 'weatherApi.noParams',
    units: 'units needs to be standard, metric or imperial',
    unitsKey: 'weatherApi.units',
    weatherApi: 'Could not get weather data, please try again later',
    weatherApiKey: 'weatherApi.weatherApi',
  }
};

// Location API Data
const LOCATION = {
  url: 'http://api.geonames.org/postalCodeLookupJSON',
  username: 'dgalindez',
}

// Weather API Data
const WEATHER = {
  url: 'http://api.openweathermap.org/data/2.5/forecast',
  /*
   * We should be getting this from env
   * since it is unsafe to store API keys in code,
   * but for ease of use (so starting does not require an env)
   * we'll keep it here
   */
  apiKey: '24c2c5a78d3b260e779c6db6579ee752',
}

module.exports = {
  UNITS,
  ERRORS,
  LOCATION,
  WEATHER,
};
