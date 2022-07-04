import { render, screen, act } from '@testing-library/react';

import { LOCALE } from '../utils/constants';

import useLocale from './useLocale';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

describe('useLocale', () => {
  const url = `${LOCALE.url}?key=${LOCALE.key}`;
  const data = {
    location: {
      country: {
        code: 'MX',
      },
    },
  };

  const WrapperComponent = () => {
    const { locale } = useLocale();
    return (
      <div>
        <span data-testid='locale'>{locale}</span>
      </div>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    fetch.mockClear();
  });

  it('Returns valid locale', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );

    await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act
      render(<WrapperComponent />);
    });

    expect(fetch).toHaveBeenCalledWith(url);
    expect(screen.getByTestId('locale')).toHaveTextContent(data.location.country.code);
  });

  it('Returns default locale if API did not return the right data', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    await act(async () => { // eslint-disable-line testing-library/no-unnecessary-act
      render(<WrapperComponent />);
    });

    expect(fetch).toHaveBeenCalledWith(url);
    expect(screen.getByTestId('locale')).toHaveTextContent('US');
  });

  it('Returns default locale if API call failed', () => {
    global.fetch.mockRejectedValue(() => Promise.reject());
    render(<WrapperComponent />);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(screen.getByTestId('locale')).toHaveTextContent('US');
  });
});
