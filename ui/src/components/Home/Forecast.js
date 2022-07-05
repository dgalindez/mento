import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { UNIT_SYMBOLS } from '../../utils/constants';
import AppContext from '../AppContext';

const Forecast = () => {
  const { t } = useTranslation();

  const {
    locale: {
      units,
    },
    weather: {
      daily,
    },
  } = useContext(AppContext);

  return (
    <div className="column">
      <table className="table">
        <thead>
          <tr>
            <th>{t('forecast.date')}</th>
            <th>{t('forecast.max')} / {t('forecast.min')}</th>
          </tr>
        </thead>
        <tbody>
          {daily.map(({ date, max, min }, index) => (
          <tr key={`detail-day-${index}`}>
            <td>{new Date(date).toLocaleDateString()}</td>
            <td>{max} {UNIT_SYMBOLS[units]} / {min} {UNIT_SYMBOLS[units]}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forecast;
