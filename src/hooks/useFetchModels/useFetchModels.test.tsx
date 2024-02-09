import { render, screen, waitFor } from '@testing-library/react';
import { useFetchModels } from './useFetchModels';
import { CSSProperties } from 'react';

interface TestComponentProps {
    brandCode?: string;
  }
  
  const TestComponent: React.FC<TestComponentProps> = ({ brandCode }) => {
    const { models, disableModelInput } = useFetchModels(brandCode);
  
    const divStyle: CSSProperties = {
      pointerEvents: disableModelInput ? 'none' : 'auto',
      opacity: disableModelInput ? 0.5 : 1,
    };
  
    return (
      <div>
        <div data-testid="model-input" style={divStyle}>
          {models.map((model) => (
            <span key={model.nome}>{model.nome}</span>
          ))}
        </div>
      </div>
    );
  }

  describe('useFetchModels hook', () => {
    beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = jest.fn() as jest.Mock;
    });

    it('inicia com estado padrão', async () => {
        render(<TestComponent brandCode={undefined} />);
        const modelInput = screen.getByTestId('model-input');
        expect(modelInput).toHaveStyle('pointerEvents: none');
        expect(modelInput).toHaveStyle('opacity: 0.5');
        expect(modelInput).toBeEmptyDOMElement();
      });

      it('busca modelos com sucesso', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ modelos: [{ nome: 'Modelo 1' }] }),
            })
        );
      
        render(<TestComponent brandCode="123" />);
      
        await waitFor(() => {
          expect(screen.getByText('Modelo 1')).toBeInTheDocument();
        });
      
        const modelInput = screen.getByTestId('model-input');
        expect(modelInput).not.toHaveStyle('pointerEvents: none');
        expect(modelInput).not.toHaveStyle('opacity: 0.5');
      });
  
    it('trata erro na busca de modelos', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                json: () => Promise.resolve({ mensagemDeErro: 'Erro ao buscar modelos da API' }),
            })
        );  
      

        render(<TestComponent brandCode="123" />);

        await waitFor(() => {
        const modelInput = screen.getByTestId('model-input');
        expect(modelInput).toHaveStyle('pointerEvents: none');
        expect(modelInput).toHaveStyle('opacity: 0.5');

        expect(screen.queryByText('Modelo 1')).not.toBeInTheDocument();
        });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  });