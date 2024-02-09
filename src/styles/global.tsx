"use client"
import { Global, css } from '@emotion/react';

export const global = css`
:root {
    --background: #f9f5fb;

    --color-white-0: #ffffff;
    --color-purple-0: #5D02BF;
    --color-green-0: #DCF5F2;

    --font-primary: Roboto, Oxygen, 
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --font-color-tertiary: #757575;

    --space-1x: 4px;
    --space-2x: 8px;
    --space-3x: 12px;
    --space-4x: 16px;
    --space-5x: 20px;
    --space-6x: 24px;
    --space-7x: 28px;
    --space-8x: 32px;
    --space-9x: 36px;
    --space-10x: 40px;
    --space-11x: 44px;
    --space-12x: 48px;
    --space-13x: 52px;
    --space-14x: 56px;
    --space-15x: 60px;
    --space-16x: 64px;
    --space-17x: 68px;
    --space-18x: 72px;
    --space-19x: 76px;
    --space-20x: 80px;

    --border-radius-1x: 4px;
    --border-radius-2x: 8px;

    --font-size-xs: 14px;
    --font-size-s: 16px;
    --font-size-m: 20px;
    --font-size-l: 26px;
    --font-size-xl: 30px;
    --font-size-2xl: 36px;
    --font-size-3xl: 45px;
  }

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    background: var(--background);
    max-width: 100vw;
    overflow-x: hidden;
    font-family: var(--font-primary);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const breakpoints = {
  desktop: '@media only screen and (min-width: 1280px)',
  tabletLand: '@media only screen and (min-width: 975px)',
  tablet: '@media only screen and (min-width: 600px)',
  mobileLand: '@media only screen and (min-width: 480px',
};

export function GlobalStyles() {
  return (
    <Global styles={global} />
  )
}
