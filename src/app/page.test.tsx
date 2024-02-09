import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renderiza o título e subtítulo corretamente', () => {
    render(<HomePage />);

    expect(screen.getByText('Tabela Fipe')).toBeInTheDocument();
    expect(screen.getByText('Consulte o valor de um veículo gratuitamente')).toBeInTheDocument();
  });

  it('renderiza o formulário corretamente', () => {
    render(<HomePage />);
    expect(screen.getByRole('combobox', { name: 'Marca' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Modelo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Consultar preço' })).toBeInTheDocument();
  });
});


