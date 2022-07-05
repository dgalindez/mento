import { useEffect, useState } from 'react';

import { LOCALE } from '../utils/constants';

/**
 * @typedef {Object} Locale
 * @property {string} locale - String locale
 * @property {Function} setLocale - Set Locale to user's preference
 * @property {Function} setLocale - Set zip to user's selection
 * @property {string} zip - String zip code
 */

/**
 * Obtains locale from client's browser
 * Returns US if it cannot get it
 * @return {Locale}
 */
const useLocale = () => {
  const [locale, setLocale] = useState(LOCALE.default);
  const [units, setUnits] = useState(LOCALE.defaultUnits);
  const [zip, setZip] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${LOCALE.url}?key=${LOCALE.key}`);
        const data = await response.json();
        setLocale(data?.location?.country?.code ?? LOCALE.default);
      } catch {
        setLocale(LOCALE.default);
      }
    })();
  }, []);

  return {
    locale,
    setLocale,
    setUnits,
    setZip,
    units,
    zip,
  };
};

export default useLocale;

