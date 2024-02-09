import styled from '@emotion/styled'
import { Theme } from '@emotion/react';
import { SxProps } from '@mui/system';
import { breakpoints } from '@/styles/global';

const { tabletLand } = breakpoints;

export const FormContainer = styled.form`
    background: var(--color-white-0);
    width: 100%;
    padding: var(--space-9x) var(--space-16x);
    border-radius: var(--border-radius-2x);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5x);

    ${tabletLand} {
        width: fit-content;
    }
`

export const SearchButton = styled.button`
    background: var(--color-purple-0);
    border: none;
    color: var(--color-white-0);
    padding: var(--space-4x) var(--space-10x);
    margin-top: var(--space-3x);
    border-radius: var(--border-radius-2x);
    max-width: 216px;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: var(--font-size-s);
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

