import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../utils/i18nTestHelper';
import AppContext from '../AppContext';

import Forecast from './Forecast';

describe('Forecast', () => {
  let contextData = {};

  beforeEach(() => {
    contextData = {
      locale: {
        units: 'metric',
      },
      weather: {
        daily: [
          {
            max: 22.35,
            min: 14.75,
            date: 'Tue, 05 Jul 2022 06:00:00 GMT'
          },
          {
            max: 22.04,
            min: 13.8,
            date: 'Wed, 06 Jul 2022 00:00:00 GMT'
          },
          {
            max: 21.08,
            min: 12.85,
            date: 'Thu, 07 Jul 2022 00:00:00 GMT'
          },
          {
            max: 24.47,
            min: 12.91,
            date: 'Fri, 08 Jul 2022 00:00:00 GMT'
          },
          {
            max: 25.43,
            min: 13.72,
            date: 'Sat, 09 Jul 2022 00:00:00 GMT'
          },
          {
            max: 21.71,
            min: 17.79,
            date: 'Sun, 10 Jul 2022 00:00:00 GMT'
          },
        ],
      },
    }
  });

  it('renders correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Forecast />
        </AppContext.Provider>
      </I18nextProvider>
    );
    expect(screen.getByRole('table')).toMatchSnapshot();
  })
});
