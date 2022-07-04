import { renderHook, act, waitFor } from '@testing-library/react'

import { WEATHER } from '../utils/constants';

import useWeatherApi from './useWeatherApi';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

describe('useWeatherApi', () => {
  const current = { sucess: true };
  const daily = [
    { sucess: true },
    { failure: false },
  ];

  const data = {
    city: 'San Francisco',
    country: 'US',
    current,
    daily,
  };

  const errorKey = 'errorKey';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    fetch.mockClear();
  });

  it('Returns empty data, loading and error false initially', () => {
    const { result } = renderHook(() => useWeatherApi());

    expect(result.current.city).toEqual('');
    expect(result.current.country).toEqual('');
    expect(result.current.current).toEqual({});
    expect(result.current.daily).toHaveLength(0);
    expect(result.current.error).toEqual('');
    expect(result.current.getLocationData).not.toBeNull();
    expect(result.current.getZipData).not.toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('Calls getLocationData with lat and lon', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );

    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getLocationData(1, 1, '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.city).toEqual(data.city));
    expect(result.current.country).toEqual(data.country);
    expect(result.current.current).toEqual(current);

    expect(result.current.daily).toEqual(daily);
    expect(result.current.error).toEqual('');
    expect(result.current.loading).toBeFalsy();
  });

  it('Calls getZipData with zip and locale', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );

    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getZipData('', '', '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.city).toEqual(data.city));
    expect(result.current.country).toEqual(data.country);
    expect(result.current.current).toEqual(current);

    expect(result.current.daily).toEqual(daily);
    expect(result.current.error).toEqual('');
    expect(result.current.loading).toBeFalsy();
  });

  it('Returns error from API if provided', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve({ errorKey }),
      })
    );
    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getZipData('', '', '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toEqual(errorKey);
  });

  it('Returns error from API if request was malformed', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ errorKey }),
      })
    );
    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getZipData('', '', '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toEqual(errorKey);
  });

  it('Returns generic error if API does not provide it', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve(),
      })
    );
    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getZipData('', '', '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toEqual(WEATHER.genericError);
  });

  it('Returns generic error if something fails', async () => {
    global.fetch.mockRejectedValue(() => Promise.reject());
    const { result } = renderHook(() => useWeatherApi());

    act(() => {
      result.current.getZipData('', '', '');
    });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(result.current.error).toEqual(WEATHER.genericError);
  });
});
