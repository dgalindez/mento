import { render, screen } from '@testing-library/react';
// await waitFor(() => expect(contextData.locale.setZip).toHaveBeenCalledWith('zip'));
// import userEvent from '@testing-library/user-event';
// userEvent.click(screen.getByText('input.button'));
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import AppContext from '../AppContext';
import i18n from '../../utils/i18nTestHelper';

import Details from '.';

const mock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mock,
 }));


describe('Details', () => {
  let contextData = {};
  const daily = [
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
  ];

  beforeEach(() => {
    contextData = {
      locale: {
        units: 'metric',
      },
      weather: {
        city: 'Seattle',
        country: 'US',
        daily,
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
            <Details />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  })

  it('renders loading when data is being fetched', () => {
    contextData.weather.loading = true;

    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Details />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  })

  it('renders loading when an error is present', () => {
    contextData.weather.error = 'error';

    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Details />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  })

  it('navigates to root if no data is present', () => {
    contextData.weather.daily = [];

    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppContext.Provider value={contextData}>
            <Details />
          </AppContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(mock).toHaveBeenCalledWith('/');
  })
});
