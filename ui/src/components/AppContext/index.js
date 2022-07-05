import { createContext, useEffect } from 'react';

import useGeolocation from '../../hooks/useGeolocation';
import useLocale from '../../hooks/useLocale';
import useWeatherApi from '../../hooks/useWeatherApi';

const AppContext = createContext({
  geolocation: {},
  locale: {},
  weather: {},
});

export const ContextComponent = ({ children }) => {
  const geolocation = useGeolocation();
  const locale = useLocale();
  const weather = useWeatherApi();

  useEffect(() => {
    if (!geolocation?.failed) {
      weather?.getLocationData(geolocation.lat, geolocation.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.failed, geolocation.lat, geolocation.lon]);

  return (
    <AppContext.Provider value={{ geolocation, locale, weather }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
