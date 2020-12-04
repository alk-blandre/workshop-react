import { fireEvent, render, screen } from '@testing-library/react';
import { BasicsFunc } from './011_basics';

test('it should increment and decrement the counter', () => {
  render(<BasicsFunc />);
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(screen.getByText('-')).toBeInTheDocument();
  expect(screen.getByText('+')).toBeInTheDocument();
  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText('+'));
  expect(screen.getByText('2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('-'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
