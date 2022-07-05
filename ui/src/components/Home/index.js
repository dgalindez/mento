import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

import Forecast from './Forecast';

import './index.css';

const Home = () => {
  const { t } = useTranslation();
  const {
    weather: {
      city,
      country,
      error,
      loading,
    },
  } = useContext(AppContext);

  const tabs = ['/temperature', '/sensation', '/humidity'];
  const { pathname = '' } = useLocation();

  if (error || loading) {
    return (
      <div className="columns" role="heading" aria-level="1">
        <div className="control is-large is-loading">
          <input className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="tabs is-boxed is-large mt-4 mx-6" role="heading" aria-level="1">
        <ul>
          {tabs.map((tab, index) => (
            <li className={pathname.includes(tab) ? 'is-active' : ''} key={`tab-${index}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to={tab}>
                {t(`home.tab.${tab.substring(1)}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="columns mx-6">
        <div className="column">
          <span className="title">{city}, </span>
          <span className="subtitle">{country}</span>
        </div>
        <Forecast />
      </div>
    </>
  );
};

export default Home;
