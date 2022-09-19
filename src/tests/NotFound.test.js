import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('Teste o componente <NotFound.js />', () => {
  render(<NotFound />);
  const aboutTitle = screen.getByRole('heading', { name: 'Page requested not found' });
  const image = screen.getByRole(
    'img',
    { name: 'Pikachu crying because the page requested was not found' },
  );
  expect(aboutTitle).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
