import styled from '@emotion/styled'
import { breakpoints } from '@/styles/global';

const { tabletLand } = breakpoints;

export const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 24px;

    ${tabletLand} {
        padding: 0;
    }
`

export const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    
    text-align: center;
`

export const Subtitle = styled.p`
    font-weight: 500;
    font-size: 20px;

    ${tabletLand} {
        font-size: 30px;
    }
`

export const Title = styled.h1`
    font-weight: 600;
    font-size: 26px;

    ${tabletLand} {
        font-size: 36px;
    }
`
