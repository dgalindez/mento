import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

import './index.css';

const Humidity = () => {
  const { t } = useTranslation();
  const {
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
            <th>{t('sensation.title')}</th>
            <th>{current.humidity}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Humidity;
