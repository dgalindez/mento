import { render, screen } from '@testing-library/react'

import useGeolocation from '../../hooks/useGeolocation';
import useLocale from '../../hooks/useLocale';
import useWeatherApi from '../../hooks/useWeatherApi';

import { ContextComponent } from '.'

jest.mock('../../hooks/useGeolocation')
jest.mock('../../hooks/useLocale')
jest.mock('../../hooks/useWeatherApi')

describe('ContextComponent', () => {
  beforeEach(() => {
    useGeolocation.mockImplementation(() => ({
      failed: false,
      lat: 0,
      lon: 0,
    }));
  });

  it('renders correctly, calls hooks', () => {
    render(
      <ContextComponent>
        Some component
      </ContextComponent>
    );

    expect(useGeolocation).toHaveBeenCalledTimes(1);
    expect(useLocale).toHaveBeenCalledTimes(1);
    expect(useWeatherApi).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Some component')).not.toBeNull();
  });
});
