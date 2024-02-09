import styled from '@emotion/styled'
import { breakpoints } from '@/styles/global';

const { tabletLand } = breakpoints;

export const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 var(--space-6x);

    ${tabletLand} {
        padding: 0;
    }
`

export const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-5x);
    
    text-align: center;
`

export const Subtitle = styled.p`
    font-weight: 500;
    font-size: var(--font-size-m);

    ${tabletLand} {
        font-size: var(--font-size-xl);
    }
`

export const Title = styled.h1`
    font-weight: 600;
    font-size: var(--font-size-l);

    ${tabletLand} {
        font-size: var(--font-size-2xl);
    }
`
