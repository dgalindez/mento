import { render, screen, waitFor } from '@testing-library/react';import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../utils/i18nTestHelper';
import AppContext from '../AppContext';

import LocationInput from '.';

describe('LocationInput', () => {
  let contextData = {};

  beforeEach(() => {
    contextData = {
      geolocation: {
        loading: false,
        failed: false,
      },
      locale: {
        setLocale: jest.fn(),
        setUnits: jest.fn(),
        setZip: jest.fn(),
      },
      weather: {
        error: '',
        loading: false,
        getZipData: jest.fn(),
      },
    }
  });

  it('renders correctly', () => {
    const { container: view } = render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <LocationInput />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(view).toMatchSnapshot();
  });

  it('updates zip and locale', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <LocationInput />
        </AppContext.Provider>
      </I18nextProvider>
    );

    userEvent.type(
      screen.getByPlaceholderText('input.zipLabel'),
      'zip',
      { delay: 1 }
    );

    await waitFor(
      () => expect(contextData.locale.setZip).toHaveBeenCalledWith('zip')
    );
    expect(screen.getByPlaceholderText('input.zipLabel')).toMatchSnapshot();

    userEvent.type(
      screen.getByPlaceholderText('input.localeLabel'),
      'locale',
      { delay: 1 }
    );

    await waitFor(
      () => expect(contextData.locale.setLocale).toHaveBeenCalledWith('locale')
    );
    expect(screen.getByPlaceholderText('input.localeLabel')).toMatchSnapshot();
  });

  it('updates selected units', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <LocationInput />
        </AppContext.Provider>
      </I18nextProvider>
    );

    userEvent.click(screen.getByText('input.select.imperial'));
    userEvent.click(screen.getByText('input.select.metric'));

    expect(screen.getByText('input.select.metric')).toMatchSnapshot();
  });

  it('performs search', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <LocationInput />
        </AppContext.Provider>
      </I18nextProvider>
    );


    userEvent.type(
      screen.getByPlaceholderText('input.zipLabel'),
      'zip',
      { delay: 1 }
    );

    userEvent.type(
      screen.getByPlaceholderText('input.localeLabel'),
      'locale',
      { delay: 1 }
    );

    userEvent.click(screen.getByText('input.button'));
    expect(contextData.weather.getZipData).toHaveBeenCalledTimes(0);
  });
});
