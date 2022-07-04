/** @namespace WeatherApi */
import { useState } from 'react';

/**
 * @typedef {Object} Data
 * @property {Data} - String locale
 * @inner
 */

/**
 * @typedef {Object} Weather
 * @property {Function} getData - Callback to fetch data from API
 * @property {} getData - Callback to fetch data from API
 * @inner
 */

/**
 * Exposes a way to call API and interact with last obtained data
 * @return {Weather}
 */
const useWeatherApi = () => {
  // TODO: Get ENV for URL
  // TODO: Handle errors
  // TODO: Handle BE down
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Fetch data from API using lat and lon
   * @param [number] lat - Latitude for location
   * @param [number] lon - Longitude for location
   */
  const getLocationData = async (lat, lon) => {
    setLoading(true);
    // TODO: Actually call API
    console.log(lat, lon)
    setData({});
    setError('');
    setLoading(false);
  };

  /**
   * Fetch data from API using zip and locale
   * @param [string] zip - ZIP code to look for
   * @param [string] locale - Locale to use
   */
  const getZipData = async (zip, locale) => {
    setLoading(true);
    // TODO: Actually call API
    console.log(zip, locale)
    setData({});
    setError(false);
    setLoading(false);
  };

  return {
    data,
    error,
    getLocationData,
    getZipData,
    loading,
  };
};

export default useWeatherApi;
