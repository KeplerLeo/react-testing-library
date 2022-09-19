import react from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {
  renderWithRouter(<App />);
  const pokeName = 'pokemon-name';
  const pokemonsHeading = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(pokemonsHeading).toBeInTheDocument();

  const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(nextBtn);
  const charmanderName = screen.getByTestId(pokeName, { name: 'Charmander' });
  expect(charmanderName).toBeInTheDocument();

  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);

  const pikachuName = screen.getByTestId(pokeName, { name: 'Pikachu' });
  expect(pikachuName).toBeInTheDocument();

  const charmanderNameNot = screen.queryByText('Charmander');
  expect(charmanderNameNot).not.toBeInTheDocument();

  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const filterBtn = screen.getAllByTestId('pokemon-type-button');
  const allBtn = screen.getByRole('button', { name: 'All' });

  filterBtn.forEach((button, index) => {
    userEvent.click(button);
    expect(allBtn).toBeInTheDocument();
    expect(button).toHaveTextContent(types[index]);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(types[index]);
    userEvent.click(nextBtn);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(types[index]);
  });

  userEvent.click(allBtn);
  expect(screen.getByTestId(pokeName)).toHaveTextContent('Pikachu');
  userEvent.click(nextBtn);
  expect(charmanderName).toBeInTheDocument();
});
