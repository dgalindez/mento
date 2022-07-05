import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../utils/i18nTestHelper';
import AppContext from '../AppContext';

import Home from '.';

let mockPathname = '';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: mockPathname })
 }));

describe('Home', () => {
  let contextData = {};

  beforeEach(() => {
    contextData = {
      locale: {
        units: 'metric',
      },
      weather: {
        city: 'Seattle',
        country: 'US',
        daily: [],
        error: '',
        loading: false,
      },
    }
  });

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Home />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders temperature tab as active', () => {
    mockPathname = '/temperature';
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Home />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders humidity tab as active', () => {
    mockPathname = '/humidity';
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Home />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders sensation tab as active', () => {
    mockPathname = '/sensation';
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Home />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders loading if data is being fetched', () => {
    contextData.weather.loading = true;
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Home />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })

  it('renders loading if fetching data failed', () => {
    contextData.weather.error = 'some error';
    render(
      <I18nextProvider i18n={i18n}>
        <AppContext.Provider value={contextData}>
          <Home />
        </AppContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByRole('heading')).toMatchSnapshot();
  })
});
