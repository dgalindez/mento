import { useEffect, useState } from 'react';

import { GEOLOCATION } from '../utils/constants';

/**
 * @typedef {Object} Geolocation
 * @property {number} lat - Latitude for current location
 * @property {number} lon - Longitude for current location
 * @property {boolean} failed - If the geolocation data is not available
 * @property {boolean} loaded - If geolocation request has gone through or not
 */

/**
 * Obtains geolocation from client's browser
 * Returns if blocked/unallowed SF as the default
 * @return {Geolocation}
 */
const useGeolocation = () => {
  const [lat, setLat] = useState(GEOLOCATION.defaultLatitude);
  const [lon, setLon] = useState(GEOLOCATION.defaultLongitude);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const success = ({ coords }) => {
    setLat(coords.latitude);
    setLon(coords.longitude);
    setFailed(false);
    setLoading(false);
  };

  const failure = () => {
    setLat(GEOLOCATION.defaultLatitude);
    setLon(GEOLOCATION.defaultLongitude);
    setFailed(true);
    setLoading(false);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator?.geolocation?.watchPosition(success, failure);
      return () => navigator?.geolocation?.clearWatch(watchId);
    }

    failure();
    return;
  }, []);

  return {
    failed,
    lat,
    loading,
    lon,
  };
};

export default useGeolocation;
