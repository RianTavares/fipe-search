import styled from '@emotion/styled'

export const FormContainer = styled.form`
    background: var(--color-white-0);
    width: fit-content;
    padding: 36px 62px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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

export const autocompleteClassTest = {
    width: 500,
    fontFamily: 'var(--font-primary)',
};

export const disabledButton = {
    backgroundColor: '#DCDCDC',
    color: '#ABADB2'
};