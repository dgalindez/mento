import { render, screen } from '@testing-library/react';
import EightDayForecast from './EightDayForecast';

test('renders correctly', () => {
  render(<EightDayForecast />);
  expect(screen).toMatchSnapshot();
});
