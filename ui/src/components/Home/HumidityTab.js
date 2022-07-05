import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

const TemperatureTab = () => {
  const { t } = useTranslation();
  const {
    weather: {
      current,
    },
  } = useContext(AppContext);

  return (
    <div className="m-4 mx-6">
      {t('home.tab.humidity')} {current.humidity}
    </div>
  );
};

export default TemperatureTab;
