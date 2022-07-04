import { useState } from 'react';

/**
 * @typedef {Object} Locale
 * @property {string} locale - String locale
 * @property {Function} setLocale - Set Locale to user's preference
 */

/**
 * Obtains locale from client's browser
 * Returns US if it cannot get it
 * @return {Locale}
 */
const useLocale = () => {
  // TODO: Get locale
  const [locale, setLocale] = useState('US');

  return {
    locale,
    setLocale
  };
};

export default useLocale;

