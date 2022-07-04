import { render, screen } from '@testing-library/react';
import LocationInput from '.';

test('renders correctly', () => {
  render(<LocationInput />);
  expect(screen).toMatchSnapshot();
});
