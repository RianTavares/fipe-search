import { render, screen } from '@testing-library/react';
import { ResultsContext } from '@/context';
import Results from '@/components/Results/Results';
import { value } from '@/mocks'; 

describe('Results Component', () => {
  test('should display results correctly', () => {
    const setResults = jest.fn();

    render(
      <ResultsContext.Provider value={{ results: value, setResults }}>
        <Results />
      </ResultsContext.Provider>
    );

    expect(screen.getByText(`Tabela Fipe: Preço ${value.Modelo}`)).toBeInTheDocument();
    expect(screen.getByText(value.Valor.split(',')[0])).toBeInTheDocument();
  });
});
