import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste o componente <FavoritePokemons.js />', () => {
  const { history } = renderWithRouter(<App />);
  const favPage = '/favorites';
  const pikachuUrl = '/pokemons/25';

  act(() => {
    history.push(favPage);
  });
  const notFoundMessage = screen.getByText(/No favorite pokemon found/i);
  expect(notFoundMessage).toBeInTheDocument();

  act(() => {
    history.push(pikachuUrl);
  });

  const favPokemon = screen.getByText('Pokémon favoritado?');
  userEvent.click(favPokemon);

  act(() => {
    history.push(favPage);
  });

  const pikachuName = screen.getByText('Pikachu');
  expect(pikachuName).toBeInTheDocument();
});
