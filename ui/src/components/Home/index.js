import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

import HumidityTab from './HumidityTab';
import SensationTab from './SensationTab';
import TemperatureTab from './TemperatureTab';

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

  const [active, setActive] = useState(0);
  const tabs = ['temperature', 'sensation', 'humidity'];
  const changeTab = (index) => setActive(index);

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
    <>
      <div className="tabs is-boxed m-4 mx-6">
        <ul>
          {tabs.map((tab, index) => (
            <li className={active === index ? 'is-active' : ''} key={`tab-${index}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={() => changeTab(index)}>
                {t(`home.tab.${tab}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/details">
        <div className="m-4 mx-6">
          <span className="title">{city}, </span>
          <span className="subtitle">{country}</span>
        </div>
        {active === 0 && <TemperatureTab />}
        {active === 1 && <SensationTab />}
        {active === 2 && <HumidityTab />}
      </Link>
    </>
  );
};

export default Home;
