import styled from '@emotion/styled'
import { Theme } from '@emotion/react';
import { SxProps } from '@mui/system';
import { breakpoints } from '@/styles/global';

const { tabletLand } = breakpoints;

export const FormContainer = styled.form`
    background: var(--color-white-0);
    width: 100%;
    padding: 36px 62px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    ${tabletLand} {
        width: fit-content;
    }
`

export const SearchButton = styled.button`
    background: var(--color-purple-0);
    border: none;
    color: var(--color-white-0);
    padding: 16px 40px;
    margin-top: 13px;
    border-radius: 8px;
    max-width: 216px;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 16px;
`

export const autocompleteClassTest: SxProps<Theme> = {
    width: '100%',
    fontFamily: 'var(--font-primary)',
    [tabletLand]: {
        width: '500px',
    },
};

export const disabledButton = {
    backgroundColor: '#DCDCDC',
    color: '#ABADB2'
};