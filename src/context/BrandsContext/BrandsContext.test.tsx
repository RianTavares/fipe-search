import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Form } from '@/components';
import { BrandsProvider, BrandContext } from './BrandsContext';
import { BrandType } from '@/types';

const mockBrands: BrandType[] = [
    { codigo: '1', nome: 'Marca 1' },
    { codigo: '2', nome: 'Marca 2' },
  ];

interface BrandsProviderProps {
    children: ReactNode;
  }

jest.mock('@mui/material/Box', () => ({ children }: BrandsProviderProps) => <div>{children}</div>);

describe('BrandsContext', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn();
  });

  it('mostra o loader enquanto os dados estão sendo carregados', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise((resolve) => {
        setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve([]),
        }), 100);
      })
    );
  
    render(
      <BrandsProvider>
        <Form />
      </BrandsProvider>
    );
  
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
  });

  it('carrega as marcas e atualiza o estado isReady', async () => {
    const isReady = true;
    const setBrands  = jest.fn();

    render(
      <BrandContext.Provider value={{ brands: mockBrands, setBrands, isReady }}>
        <Form />
      </BrandContext.Provider>
    );
  
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'Marca' })).toBeInTheDocument();
    });
  });

  it('lida com erro na busca de marcas', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Falha ao buscar'));

    render(
      <BrandsProvider>
        <Form />
      </BrandsProvider>
    );

    await waitFor(() => {
        expect(screen.getByTestId('loader-container')).toBeInTheDocument();
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
