import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { ThemeInterface } from 'typings';

export const GlobalStyles = createGlobalStyle<ThemeInterface>`
  ${normalize}

  @font-face {
    font-family: Roboto, sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  }

  html {
    font-family: Roboto, sans-serif;
  }

  body {
    color: ${props => props.theme.colors.utils.text.dark};
  }

  a {
    color: ${props => props.theme.colors.main.primary};
    text-decoration: underline;
  }

  h1 {
    font-weight: 300;
    font-size: 96px;
    text-transform: none;
    letter-spacing: -0.015em;
    color: ${props => props.theme.colors.utils.text.dark};
  }

  h2 {
    font-weight: 300;
    font-size: 60px;
    text-transform: none;
    letter-spacing: -0.005em;
    color: ${props => props.theme.colors.utils.text.dark};
  }

  h3 {
    font-weight: normal;
    font-size: 48px;
    text-transform: none;
    letter-spacing: 0;
    color: ${props => props.theme.colors.utils.text.dark};
  }

  h4 {
    font-weight: normal;
    font-size: 34px;
    text-transform: none;
    letter-spacing: 0.0025em;
    color: ${props => props.theme.colors.utils.text.dark};
  }

  h5 {
    font-weight: normal;
    font-size: 24px;
    text-transform: none;
    letter-spacing: 0;
    color: ${props => props.theme.colors.utils.text.dark};
  }

  h6 {
    font-weight: 500;
    font-size: 20px;
    text-transform: none;
    letter-spacing: 0.0015em;
    line-height: 23px;
    color: ${props => props.theme.colors.utils.text.dark};
  }
`;
