/** @namespace WeatherData */

/**
 * @typedef {Object} DayData
 * @property {number} feelsLike - Latitude as float
 * @property {number} weather - Longitude as float
 * @property {number} humidity - Whether or not lat and lon are valid floast
 */

/**
 * @typedef {Object} Weather
 * @property {DayData} current - Today's weather data
 * @property {DayData[]} daily - Next 8 days of weather data
 */

/**
 * Clean up data from Weather API for easier consumption
 * @param {Object} data - Weather API Data
 * @return {Weather} - Promise API JSON Data
 */
const cleanData = ({ city = {}, list = [] } = {}) => {
  const first = list?.[0];
  let last = new Date(`${list[0]?.dt_txt}Z`);
  let max = first?.main.temp_max;
  let min = first?.main.temp_min;

  const current = {
    feelsLike: first?.main?.feels_like,
    humidity: first?.main?.humidity,
    temperature: first?.main?.temp,
  };

  const daily = [];

  list.forEach(({ dt_txt, main }, index) => {
    const date = new Date(`${dt_txt}Z`);

    if (last.getUTCDate() !== date.getUTCDate()) {
      daily.push({ max, min, date: last.toUTCString() });
      last = date;
      max = main.temp_max;
      min = main.temp_min;
      return;
    }

    if (max < main.temp_max) max = main.temp_max;
    if (min > main.temp_min) min = main.temp_min;

    if (index === list.length - 1) {
      daily.push({ max, min, date: last.toUTCString() });
      last = date.getUTCDate();
      max = main.temp_max;
      min = main.temp_min;
    }
  });

  current.max = daily?.[0]?.max;
  current.min = daily?.[0]?.min;

  return {
    city: city?.name ?? '',
    country: city?.country ?? '',
    current,
    daily,
  };
};

module.exports = cleanData;
