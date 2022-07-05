import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UNIT_SYMBOLS } from '../../utils/constants';
import AppContext from '../AppContext';

const Details = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    locale: {
      units,
    },
    weather: {
      city,
      country,
      daily,
      error,
      loading,
    },
  } = useContext(AppContext);

  useEffect(() => {
    if (!daily.length && !loading) {
      navigate('/');
    }
  }, [daily, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error || loading) {
    return (
      <div className="columns">
        <div className="control is-large is-loading">
          <input className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 mx-6">
      <Link to="/">
        <span className="icon is-large">
          <i className="fas fa-arrow-left" />
        </span>
      </Link>
      <span className="title">{city}, </span>
      <span className="subtitle">{country}</span>
      <table className="table m-4 mx-6">
        <thead>
          <tr>
            <th>{t('details.date')}</th>
            <th>{t('details.max')} / {t('details.min')}</th>
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

export default Details;
