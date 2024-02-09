import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import { BrandContext, ResultsContext } from '@/context';

const mockBrands = [{ codigo: '1', nome: 'Marca Teste' }];
const mockModels = [{ codigo: '1', nome: 'Modelo Teste' }];
const mockYears = [{ codigo: '2024', nome: '2024' }];

jest.mock('@/hooks/useFetchModels/useFetchModels', () => ({
  useFetchModels: () => ({
    models: mockModels,
    disableModelInput: false,
    setDisableModelInput: jest.fn(),
    setModels: jest.fn(),
  }),
}));

jest.mock('@/hooks/useFetchYears/useFetchYears', () => ({
  useFetchYears: () => ({
    years: mockYears,
    showYearInput: true,
    setShowYearInput: jest.fn(),
    setYears: jest.fn(),
  }),
}));

describe('Form Component Success Scenarios', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ algumDado: 'dado de resposta' }),
      }) as Promise<Response>
    );
  });

  it('submits form and processes response correctly', async () => {
    const setResults = jest.fn();
    const isReady = true;
    const setBrands  = jest.fn();
    const results = null;

    render(
      <BrandContext.Provider value={{ brands: mockBrands, setBrands, isReady }}>
        <ResultsContext.Provider value={{ results, setResults }}>
          <Form />
        </ResultsContext.Provider>
      </BrandContext.Provider>
    );

    const marcaCombobox = screen.getByRole('combobox', { name: 'Marca' });
    await userEvent.type(marcaCombobox, 'Marca Teste');
    await userEvent.keyboard('{arrowdown}{enter}');

    const modelCombobox = screen.getByRole('combobox', { name: 'Modelo' });
    await userEvent.type(modelCombobox, 'Modelo Teste');
    await userEvent.keyboard('{arrowdown}{enter}');

    const yearCombobox = screen.getByRole('combobox', { name: 'Ano' });
    await userEvent.type(yearCombobox, '2024');
    await userEvent.keyboard('{arrowdown}{enter}');

    await userEvent.click(screen.getByRole('button', { name: /Consultar preço/i }));

    await waitFor(() => {
      expect(setResults).toHaveBeenCalledWith({ algumDado: 'dado de resposta' });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe('Form Component Failure Scenarios', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ mensagemDeErro: 'Erro ao buscar dados' }),
      }) as Promise<Response>
    );
  });

  it('displays an error alert when the form submission fails', async () => {
    const setResults = jest.fn();
    const isReady = true;
    const setBrands  = jest.fn();
    const results = null;

    render(
      <BrandContext.Provider value={{ brands: mockBrands, setBrands, isReady }}>
        <ResultsContext.Provider value={{ results, setResults }}>
          <Form />
        </ResultsContext.Provider>
      </BrandContext.Provider>
    );

    const marcaCombobox = screen.getByRole('combobox', { name: 'Marca' });
    await userEvent.type(marcaCombobox, 'Marca Teste');
    await userEvent.keyboard('{arrowdown}{enter}');

    const modelCombobox = screen.getByRole('combobox', { name: 'Modelo' });
    await userEvent.type(modelCombobox, 'Modelo Teste');
    await userEvent.keyboard('{arrowdown}{enter}');

    const yearCombobox = screen.getByRole('combobox', { name: 'Ano' });
    await userEvent.type(yearCombobox, '2024');
    await userEvent.keyboard('{arrowdown}{enter}');

    await userEvent.click(screen.getByRole('button', { name: /Consultar preço/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Ocorreu um erro ao consultar preço.');
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
