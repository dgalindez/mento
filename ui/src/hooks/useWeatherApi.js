/** @namespace WeatherApi */
import { useState } from 'react';

import { WEATHER } from '../utils/constants';

/**
 * @typedef {Object} WeatherData
 * @property {Data} - String locale
 * @inner
 */

/**
 * @typedef {Object} Weather
 * @property {string} city - City name for location provided
 * @property {string} country - Country code for location provided
 * @property {WeatherData} current - Today's weather data
 * @property {WeatherData[]} daily - Weather data for next 5 days
 * @property {string} error - Error string for failures from API
 * @property {Function} getLocationData - Callback to fetch data from API with lat & lon
 * @property {Function} getZipData - Callback to fetch data from API with zip & locale
 * @property {boolean} loading - If an API call is being made or not
 * @inner
 */

/**
 * Exposes a way to call API and interact with last obtained data
 * @return {Weather}
 */
const useWeatherApi = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [current, setCurrent] = useState({});

  const [daily, setDaily] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Fetch data from API using lat and lon
   * Updates data object
   * @param [number] lat - Latitude for location
   * @param [number] lon - Longitude for location
   * @param [string] units - Units for data, standard, metric or imperial
   * @return [Promise] - Promise to obtain and set data
   */
  const getLocationData = async (lat, lon, units) => {
    const url = `${WEATHER.url}/weather?lat=${lat}&lon=${lon}&units=${units}`;
    return getAndSetData(url);
  };

  /**
   * Fetch data from API using zip and locale
   * Updates data object
   * @param [string] zip - ZIP code to look for
   * @param [string] locale - Locale to use
   * @param [string] units - Units for data, standard, metric or imperial
   * @return [Promise] - Promise to obtain and set data
   */
  const getZipData = async (zip, locale, units) => {
    const url = `${WEATHER.url}/weather?zip=${zip}&locale=${locale}&units=${units}`;
    return getAndSetData(url);
  };


  /**
   * Get Data from API and update the right objects
   * Updates daily, city, country, current, error and loading
   * @param [string] url - URL with querystring to call
   */
  const getAndSetData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      if (response.status === 500 || response.status === 400) {
        setError(jsonData?.errorKey ?? WEATHER.genericError);
      } else {
        setCity(jsonData?.city ?? '');
        setCountry(jsonData?.country ?? '');
        setCurrent(jsonData?.current ?? {});

        setDaily(jsonData?.daily ?? []);
        setError('');
      }
    } catch (error) {
      setError(WEATHER.genericError);
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    country,
    current,
    daily,
    error,
    getLocationData,
    getZipData,
    loading,
  };
};

export default useWeatherApi;
