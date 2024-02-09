import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { breakpoints } from '@/styles/global';

const { tabletLand } = breakpoints;

interface ResultContainerProps {
    hasResults: boolean;
}

const fontBaseTextStyle = css`
    font-weight: 500;
    font-size: var(--font-size-m);

    ${tabletLand} {
        font-size: var(--font-size-xl);
    }
`;

export const ResultContainer = styled.div<ResultContainerProps>`
    background-color: var(--color-green-0);
    width: 100vw;
    padding: var(--space-14x) var(--space-6x) var(--space-7x) var(--space-6x);
    text-align: center;

    display: ${props => props.hasResults ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: var(--space-20x);

    ${tabletLand} {
        padding: var(--space-14x) 0 var(--space-7x) 0;
    }
`;

export const Title = styled.p`
    ${fontBaseTextStyle}
`;

export const Price = styled.p`
    ${fontBaseTextStyle}
    padding: var(--space-3x) var(--space-5x);
    border-radius: 40px;
    background-color: #34A38C;
    color: var(--color-white-0);
    margin-top: var(--space-5x);
`;

export const SmallWarning = styled.p`
    color: var(--font-color-tertiary);
    font-size: var(--font-size-xs);
    margin-top: var(--space-4x);
`;