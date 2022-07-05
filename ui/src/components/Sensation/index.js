import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { UNIT_SYMBOLS } from '../../utils/constants';
import AppContext from '../AppContext';

import './index.css';

const Sensation = () => {
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
            <th>{t('sensation.title')}</th>
            <th>{current.feelsLike} {UNIT_SYMBOLS[units]}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Sensation;
