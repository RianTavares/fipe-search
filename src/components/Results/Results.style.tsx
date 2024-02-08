import styled from '@emotion/styled'
import { css } from '@emotion/react';

interface ResultContainerProps {
    hasResults: boolean;
}

const fontBaseTextStyle = css`
    font-weight: 500;
    font-size: 30px;
`;

export const ResultContainer = styled.div<ResultContainerProps>`
    background-color: var(--color-green-0);
    width: 100vw;
    padding: 56px 0 26px 0;

    display: ${props => props.hasResults ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 81px;
`;

export const Title = styled.p`
    ${fontBaseTextStyle}
`;

export const Price = styled.p`
    ${fontBaseTextStyle}
    padding: 12px 18px;
    border-radius: 40px;
    background-color: #34A38C;
    color: var(--color-white-0);
    margin-top: 20px;
`;

export const SmallWarning = styled.p`
    color: var(--font-color-tertiary);
    font-size: 14px;
    margin-top: 16px;
`;