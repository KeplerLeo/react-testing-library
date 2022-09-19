import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

test('Testa o componente <About.js />', () => {
  render(<About />);

  const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
  const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
  const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
  const image = screen.getByRole('img', { name: 'Pokédex' });

  expect(aboutTitle).toBeInTheDocument();
  expect(paragraphOne).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
