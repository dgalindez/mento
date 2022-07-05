import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';
import { UNITS } from '../../utils/constants';

const LocationInput = () => {
  const { t } = useTranslation();
  const {
    locale: {
      locale,
      setLocale,
      setUnits,
      setZip,
      units,
      zip,
    },
    weather: {
      getZipData,
    },
  } = useContext(AppContext);

  // Used to avoid re-rendering without re-fetching
  const [localUnits, setLocalUnits] = useState(units);

  const changeLocale = ({ target: { value } = {} } = {}) => setLocale(value);
  const changeZip = ({ target: { value } = {} } = {}) => setZip(value);
  const changeUnits = ({ target: { value } = {} } = {}) => setLocalUnits(value);

  const doSearch = () => {
    setUnits(localUnits);
    getZipData(zip, locale, localUnits);
  };

  return (
    <>
      <div className="columns m-4 mx-6">
        <div className="field column is-one-quarter">
          <label className="label">{t('input.zipLabel')}</label>
          <div className="control">
            <input
              className="input"
              placeholder={t('input.zipLabel')}
              type="text"
              value={zip}
              onChange={changeZip}
            />
          </div>
        </div>
        <div className="field column is-one-quarter">
          <label className="label">{t('input.localeLabel')}</label>
          <div className="control">
            <input
              className="input"
              placeholder={t('input.localeLabel')}
              type="text"
              value={locale}
              onChange={changeLocale}
            />
          </div>
        </div>
        <div className="field column is-one-quarter">
          <label className="label">{t('input.unitsLabel')}</label>
          <div className="control">
            <div className="select">
              <select onChange={changeUnits} value={localUnits}>
                {Object.keys(UNITS).map(unit => (
                  <option key={UNITS[unit]}>
                    {t(`input.select.${UNITS[unit]}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        className="button is-medium is-success ml-6 mb-6"
        onClick={doSearch}
        disabled={!zip || !locale}
      >
        {t('input.button')}
      </button>
    </>
  );
};

export default LocationInput;
