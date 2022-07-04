import { useState } from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import useWeatherApi from './useWeatherApi';

// TODO: Mock API
describe('useWeatherApi', () => {
  const delay = 1;

  const WrapperComponent = () => {
    const {
      data,
      error,
      getLocationData,
      getZipData,
      loading,
    } = useWeatherApi();

    const [lat, setLat] = useState(0.0);
    const [lon, setLon] = useState(0.0);
    const [zip, setZip] = useState('');
    const [locale, setLocale] = useState('');

    const changeLat = ({ target } = {}) => setLat(target?.value ?? 0.0);
    const changeLon = ({ target } = {}) => setLon(target?.value ?? 0.0);
    const changeZip = ({ target } = {}) => setZip(target?.value ?? '');
    const changeLocale = ({ target } = {}) => setLocale(target?.value ?? '');

    return (
      <div>
        <span data-testid='data'>{JSON.stringify(data)}</span>
        <span data-testid='error'>{error}</span>
        <span data-testid='loading'>{`${loading}`}</span>
        <input onChange={changeLat} placeholder="lat"/>
        <input onChange={changeLon} placeholder="lon"/>
        <input onChange={changeZip} placeholder="zip"/>
        <input onChange={changeLocale} placeholder="locale"/>
        <button onClick={() => getLocationData(lat, lon)}>getLocationData</button>
        <button onClick={() => getZipData(zip, locale)}>getZipData</button>
      </div>
    );
  };

  it('Returns empty data, loading and error false initially', () => {
    render(<WrapperComponent />);

    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  // TODO: Await API
  // TODO: Check loading change
  it('Calls getLocationData with lat and lon', async () => {
    render(<WrapperComponent />);
    const lat = screen.getByPlaceholderText('lat');
    const lon = screen.getByPlaceholderText('lon');
    const locationButton = screen.getByText('getLocationData');

    await userEvent.type(lat, '0.0', { delay });
    await userEvent.type(lon, '0.0', { delay });

    userEvent.click(locationButton);
    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });


  // TODO: Await API
  // TODO: Check loading change
  it('Calls getZipData with zip and locale', async () => {
    render(<WrapperComponent />);
    const zip = screen.getByPlaceholderText('zip');
    const locale = screen.getByPlaceholderText('locale');
    const zipButton = screen.getByText('getZipData');

    await userEvent.type(zip, '98001', { delay });
    await userEvent.type(locale, 'US', { delay });

    userEvent.click(zipButton);
    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  // TODO: Await API
  // TODO: Check loading change
  // TODO: Mock API Error
  it('Returns error with invalid lat or lon', async () => {
    render(<WrapperComponent />);
    const lat = screen.getByPlaceholderText('lat');
    const lon = screen.getByPlaceholderText('lon');
    const locationButton = screen.getByText('getLocationData');

    await userEvent.type(lat, '0.0', { delay });
    userEvent.click(locationButton);

    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    await userEvent.type(lon, '0.0', { delay });
    userEvent.click(locationButton);

    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  // TODO: Await API
  // TODO: Check loading change
  // TODO: Mock API Error
  it('Returns error with invalid zip or locale', async () => {
    render(<WrapperComponent />);
    const zip = screen.getByPlaceholderText('zip');
    const locale = screen.getByPlaceholderText('zip');
    const zipButton = screen.getByText('getZipData');

    await userEvent.type(zip, '98001', { delay });
    userEvent.click(zipButton);

    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    await userEvent.type(locale, 'US', { delay });
    userEvent.click(zipButton);

    expect(screen.getByTestId('data')).toHaveTextContent('{}');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });
});
