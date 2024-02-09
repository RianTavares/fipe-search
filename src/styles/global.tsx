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

export function GlobalStyles() {
  return (
    <Global styles={global} />
  )
}
