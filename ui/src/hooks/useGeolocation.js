import { useState } from 'react';

/**
 * @typedef {Object} Geolocation
 * @property {number} lat - Latitude for current location
 * @property {number} lon - Longitude for current location
 * @property {boolean} failed - If the geolocation data is not available
 */

/**
 * Obtains geolocation from client's browser
 * Returns if blocked/unallowed SF as the default
 * @return {Geolocation}
 */
const useGeolocation = () => {
  // TODO: Get geoloc
  // TODO: Failed logic
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [failed, setFailed] = useState(false);

  return {
    lat,
    lon,
    failed,
  };
};

export default useGeolocation;
