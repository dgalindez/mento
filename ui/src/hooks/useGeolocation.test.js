import { renderHook } from '@testing-library/react'

import useGeolocation from './useGeolocation';

import { GEOLOCATION } from '../utils/constants';

describe('useGeolocation', () => {
  const coords = {
    latitude: 100.0123,
    longitude: 123.0104,
  };

  const successfulGeolocation = (success) => success({ coords });
  const failedGeolocation = (_, failure) => failure();

  beforeEach(() => {
    global.navigator.geolocation = {
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    };
  });

  it('Returns valid geolocation', () => {
    global.navigator.geolocation.watchPosition.mockImplementationOnce(successfulGeolocation);
    const { result } = renderHook(() => useGeolocation());

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledTimes(1);
    expect(result.current.lat).toEqual(coords.latitude);
    expect(result.current.lon).toEqual(coords.longitude);
    expect(result.current.failed).toBeFalsy();
    expect(result.current.loading).toBeFalsy();
  });

  it('Returns defaults and failed if geolocation is not available', () => {
    delete global.navigator.geolocation;
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.lat).toEqual(GEOLOCATION.defaultLatitude);
    expect(result.current.lon).toEqual(GEOLOCATION.defaultLongitude);
    expect(result.current.failed).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });

  it('Returns defaults and failed if geolocation was denied', () => {
    global.navigator.geolocation.watchPosition.mockImplementationOnce(failedGeolocation);
    const { result } = renderHook(() => useGeolocation());

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledTimes(1);
    expect(result.current.lat).toEqual(GEOLOCATION.defaultLatitude);
    expect(result.current.lon).toEqual(GEOLOCATION.defaultLongitude);
    expect(result.current.failed).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });
});
