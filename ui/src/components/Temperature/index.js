import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { UNIT_SYMBOLS } from '../../utils/constants';
import AppContext from '../AppContext';

import './index.css';

const Temperature = () => {
  const { t } = useTranslation();
  const {
    locale: {
      units,
    },
    weather: {
      current,
      error,
      loading,
    },
  } = useContext(AppContext);

  if (error || loading) {
    return (
      <div className="columns loading" role="heading" aria-level="1">
        <div className="control is-large is-loading">
          <input className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4" role="main">
      <table className="table borderless">
        <thead>
          <tr>
            <th>{t('temperature.title')}</th>
            <th>{current.temperature} {UNIT_SYMBOLS[units]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('temperature.max')}</td>
            <td>{current.max} {UNIT_SYMBOLS[units]}</td>
          </tr>
          <tr>
            <td>{t('temperature.min')}</td>
            <td>{current.min} {UNIT_SYMBOLS[units]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Temperature;
