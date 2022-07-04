import { render, screen } from '@testing-library/react';
import Details from '.';

test('renders correctly', () => {
  render(<Details />);
  expect(screen).toMatchSnapshot();
});
