import { useContext } from 'react';
import { ResultsContext } from '@/context/ResultsContext';
import { Price, ResultContainer, SmallWarning, Title } from './Results.style';

const Results = () => {
    const { results } = useContext(ResultsContext);
    const hasResults = !!results;

    return (
        <ResultContainer hasResults={hasResults}>
            {results ? (
                <>
                    <Title>Tabela Fipe: Preço {results.Modelo}</Title>
                    <Price>{results.Valor.split(',')[0]}</Price>
                    <SmallWarning>
                        Este é o preço de compra do veículo
                    </SmallWarning>
                </>
            ) : (
                <div>Nenhum resultado disponível.</div>
            )}
        </ResultContainer>
    );
};

export default Results;
