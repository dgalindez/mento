import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { UNIT_SYMBOLS } from '../../utils/constants';
import AppContext from '../AppContext';

const TemperatureTab = () => {
  const { t } = useTranslation();
  const {
    locale: {
      units,
    },
    weather: {
      current,
    },
  } = useContext(AppContext);

  return (
    <div className="m-4 mx-6">
      {t('home.tab.temperature')} {current.temperature} {UNIT_SYMBOLS[units]}
      <br />
      {t('home.tab.max')} {current.max} {UNIT_SYMBOLS[units]}
      <br />
      {t('home.tab.min')} {current.min} {UNIT_SYMBOLS[units]}
    </div>
  );
};

export default TemperatureTab;
