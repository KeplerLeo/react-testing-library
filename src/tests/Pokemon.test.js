import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <Pokemon.js />', () => {
  const { history } = renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  const pokeImage = screen.getByRole('img', { name: 'Pikachu sprite' });

  expect(pokeName).toBeInTheDocument();
  expect(pokeType).toBeInTheDocument();
  expect(pokeType).toHaveTextContent('Eletric');
  expect(pokeWeight).toBeInTheDocument();
  expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokeImage).toHaveAttribute('alt', 'Pikachu sprite');

  const pokeBtn = screen.getByRole('link', { name: 'More details' });
  userEvent.click(pokeBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

  const pokeFavorite = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(pokeFavorite);
  const pokeStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(pokeStar).toHaveAttribute('src', '/star-icon.svg');
  expect(pokeStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
