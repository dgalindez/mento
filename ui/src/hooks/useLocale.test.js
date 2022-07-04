import { render, screen } from '@testing-library/react'

import useLocale from './useLocale';

describe('useLocale', () => {

  const WrapperComponent = () => {
    const { locale } = useLocale();
    return (
      <div>
        <span data-testid='locale'>{locale}</span>
      </div>
    );
  };

  it('Returns valid locale', () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId('locale')).toHaveTextContent('US');
  });

  it('Returns default locale', () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId('locale')).toHaveTextContent('US');
  });
});
