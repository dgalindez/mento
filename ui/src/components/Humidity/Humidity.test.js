import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../utils/i18nTestHelper';
import AppContext from '../AppContext';

import Humidity from '.';

describe('Humidity', () => {
  let contextData = {};

  beforeEach(() => {
    contextData = {
      weather: {
        current: {
          humidity: 89,
        },
      },
    }
  });

  it('renders correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Humidity />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  })

  it('renders loading if error', () => {
    contextData.weather.error = 'some error';
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Humidity />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders loading if data is being fetched', () => {
    contextData.weather.loading = true;
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Humidity />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })
});
