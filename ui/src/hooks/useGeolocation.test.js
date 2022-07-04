import { render, screen } from '@testing-library/react'

import useGeolocation from './useGeolocation';

describe('useGeolocation', () => {

  const WrapperComponent = () => {
    const {
      lat,
      lon,
      failed,
    } = useGeolocation();
    return (
      <div>
        <span data-testid='lat'>{lat}</span>
        <span data-testid='lon'>{lon}</span>
        <span data-testid='failed'>{`${failed}`}</span>
      </div>
    );
  };

  it('Returns valid geolocation', () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId('lat')).toHaveTextContent(0.0);
    expect(screen.getByTestId('lon')).toHaveTextContent(0.0);
    expect(screen.getByTestId('failed')).toHaveTextContent('false');
  });

  it('Returns failed with unavailable geolocation', () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId('lat')).toHaveTextContent(0.0);
    expect(screen.getByTestId('lon')).toHaveTextContent(0.0);
    expect(screen.getByTestId('failed')).toHaveTextContent('false');
  });
});
