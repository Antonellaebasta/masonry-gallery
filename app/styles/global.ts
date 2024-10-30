import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    color: var(--foreground);
    background: var(--background);
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h1, p {
    text-align: center;
    padding: 12px;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export default GlobalStyles;
