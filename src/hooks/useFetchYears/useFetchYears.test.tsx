import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useFetchYears } from './useFetchYears';
import { BrandType } from '@/types';

interface TestComponentProps {
  modelCode?: string;
  selectedBrand?: BrandType | null;
}

const TestComponent: React.FC<TestComponentProps> = ({ modelCode, selectedBrand = null }) => {
    const { years, showYearInput } = useFetchYears(modelCode, selectedBrand);

    return (
    <div>
      {showYearInput && (
        <div data-testid="year-input">
          {years.map((year) => (
            <span key={year.nome}>{year.nome}</span>
          ))}
        </div>
      )}
    </div>
  );
};

describe('useFetchYears hook', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn() as jest.Mock;
  });

  it('exibe a entrada de anos após o carregamento bem-sucedido', async () => {
    const selectedBrand = { codigo: '1', nome: 'Marca 1' };
    const mockYears = [{ nome: '2021' }, { nome: '2022' }];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockYears),
      })
    );

    render(<TestComponent modelCode="123" selectedBrand={selectedBrand} />);

    await waitFor(() => {
      expect(screen.getByTestId('year-input')).toBeInTheDocument();
      expect(screen.getByText('2021')).toBeInTheDocument();
      expect(screen.getByText('2022')).toBeInTheDocument();
    });
  });

  it('trata erro na busca de anos', async () => {
    const selectedBrand = { codigo: '1', nome: 'Marca 1' };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ mensagemDeErro: 'Erro ao buscar anos da API' }),
      })
    );

    render(<TestComponent modelCode="123" selectedBrand={selectedBrand} />);

    await waitFor(() => {
      expect(screen.queryByTestId('year-input')).not.toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
