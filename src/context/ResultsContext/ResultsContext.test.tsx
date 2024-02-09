import { render, screen, waitFor } from '@testing-library/react';
import { ResultsProvider, ResultsContext } from './ResultsContext';
import { value } from '@/mocks';
import { Results } from '@/components';

describe('ResultsProvider', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('mostra "Nenhum resultado disponível." quando não há resultados', () => {
    render(
      <ResultsProvider>
        <Results />
      </ResultsProvider>
    );

    expect(screen.getByText('Nenhum resultado disponível.')).toBeInTheDocument();
  });

  it('renderiza os resultados corretamente quando disponíveis', async () => {
    const setResults = jest.fn();

    render(
      <ResultsContext.Provider value={{ results: value, setResults }}>
        <Results />
      </ResultsContext.Provider>
    );

    expect(screen.getByText(`Tabela Fipe: Preço ${value.Modelo}`)).toBeInTheDocument();
    expect(screen.getByText(value.Valor.split(',')[0])).toBeInTheDocument();
  });

  it('lida com erro na busca de resultados', async () => {
    const setResults = jest.fn();
    render(
      <ResultsContext.Provider value={{ results: null, setResults }}>
        <Results />
      </ResultsContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Nenhum resultado disponível.')).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
