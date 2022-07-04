import { render, screen } from '@testing-library/react';
import Home from '.';

test('renders correctly', () => {
  render(<Home />);
  expect(screen).toMatchSnapshot();
});
