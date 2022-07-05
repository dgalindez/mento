export const ENGLISH = {
  banner: {
    loading: {
      failed: {
        title: 'Failed to get Geolocation data',
        body: 'Will use San Francisco as the default',
      },
    },
  },
  forecast: {
    date: 'Date',
    max: 'Max',
    min: 'Min',
  },
  home:  {
    tab: {
      temperature: 'Temperature',
      max: 'Max temperature',
      min: 'Min temperature',
      sensation: 'Feels Like',
      humidity: 'Humidity',
    },
  },
  input: {
    button: 'Search',
    localeLabel: 'Locale',
    title: 'Select locale and zip code to look for',
    unitsLabel: 'Units',
    zipLabel: 'Zip Code',
    select: {
      standard: 'standard',
      metric: 'metric',
      imperial: 'imperial',
    },
  },
  weatherApi: {
    somethingWentWrong: 'Something went wrong fetching weather data',
    locale: 'Locale was not provided or is incorrect',
    locationApi: 'Could not get lat/lon for ZIP and locale provided',
    noParams: 'Need to provide lat/lon or ZIP/locale',
    units: 'Units is not valid',
    weatherApi: 'Could not get weather data, please try again later',
  },
};
