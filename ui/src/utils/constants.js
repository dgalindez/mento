export const GEOLOCATION = {
  // Default to SF's coordinates
  defaultLatitude: 37.773972,
  defaultLongitude: -122.431297,
};

export const LOCALE = {
  default: 'US',
  defaultUnits: 'imperial',
  url: 'https://api.ipregistry.co/',
  // Same as BE, this is unsafe and should come from ENV
  key: '1lc1y7rkzocl3gsx',
};

export const WEATHER = {
  // This should come from env as well
  url: 'http://localhost:3000',
  genericError: 'weatherApi.somethingWentWrong',
};

export const UNITS = {
  standard: 'standard',
  metric: 'metric',
  imperial: 'imperial',
};

export const UNIT_SYMBOLS = {
  standard: '\u00B0',
  metric: '\u2103',
  imperial: '\u2109',
};
