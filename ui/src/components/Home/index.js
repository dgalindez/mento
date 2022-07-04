import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './index.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="columns home">
      <div className="column">
        {t('home.title')}
      </div>
      <div className="column">
        {t('home.description')}
      </div>
    </div>
  );
};

export default Home;
