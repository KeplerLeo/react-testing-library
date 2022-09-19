import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('', () => {
  const { history } = renderWithRouter(<App />);
  const pokeBtn = screen.getByRole('link', { name: 'More details' });
  userEvent.click(pokeBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

  const title = screen.getByRole('heading', { name: 'Pikachu Details' });
  const detailTitle = screen.getByRole('heading', { name: 'Summary' });
  const detailParagraph = screen.getByText(
    /This intelligent Pokémon roasts hard berries with electricity/i,
  );
  expect(title).toBeInTheDocument();
  expect(pokeBtn).not.toBeInTheDocument();
  expect(detailTitle).toBeInTheDocument();
  expect(detailParagraph).toBeInTheDocument();

  const titleLocation = screen.getByRole(
    'heading',
    { name: 'Game Locations of Pikachu' },
  );
  const mapAlt = 'Pikachu location';
  expect(titleLocation).toBeInTheDocument();
  const maps = screen.getAllByRole('img', { name: mapAlt });
  expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(maps[0]).toHaveAttribute('alt', mapAlt);
  expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(maps[1]).toHaveAttribute('alt', mapAlt);

  const pokeFavorite = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(pokeFavorite);
  const pokeStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(pokeStar).toHaveAttribute('src', '/star-icon.svg');
  expect(pokeStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
