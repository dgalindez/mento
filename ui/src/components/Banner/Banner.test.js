import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../utils/i18nTestHelper';
import AppContext from '../AppContext';
import Banner from '.';

describe('Banner', () => {
  let contextData = {};

  beforeEach(() => {
    contextData = {
      geolocation: {
        loading: false,
        failed: false,
      },
      weather: {
        error: '',
        loading: false,
      },
    }
  });

  it('renders nothing with empty data', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.queryByRole('article')).toBeNull();
  });

  it('renders nothing if loading', () => {
    contextData.geolocation.loading = true;

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.queryByRole('article')).toBeNull();
  });

  it('renders nothing if weather loading', () => {
    contextData.weather.loading = true;

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.queryByRole('article')).toBeNull();
  });

  it('renders if failed', () => {
    contextData.geolocation.failed = true;

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('article')).toMatchSnapshot();
  });

  it('renders if weather is not loading and has error', () => {
    contextData.weather.loading = false;
    contextData.weather.error = 'error';

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('article')).toMatchSnapshot();
  });

  it('renders nothing if dismissed', async () => {
    contextData.geolocation.failed = true;

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByRole('article')).toBeNull());
  });

  it('renders nothing if dismissed error', async () => {
    contextData.weather.loading = false;
    contextData.weather.error = 'error';

    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Banner />
        </AppContext.Provider>
      </I18nextProvider>
    );

    userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByRole('article')).toBeNull());
  });
});
