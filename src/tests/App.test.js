import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /Home/i });
  const linkAbout = screen.getByRole('link', { name: /About/i });
  const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test(
  `Teste se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });

    userEvent.click(linkHome);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  },
);

test(
  `Teste se a aplicação é redirecionada para a página de About, 
  na URL /about, ao clicar no link About da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(linkAbout);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  },
);

test(
  `Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(linkFavorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  },
);

test(
  `Teste se a aplicação é redirecionada para a página Not Found
   ao entrar em uma URL desconhecida.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const invalidUrl = '/invalid';

    act(() => {
      history.push(invalidUrl);
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );

    expect(notFoundTitle).toBeInTheDocument();
  },
);
