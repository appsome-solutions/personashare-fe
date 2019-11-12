import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { ThemeInterface } from 'typings';

import 'antd/dist/antd.min.css';

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
    color: ${props => props.theme.colors.utils.link};
    text-decoration: none;
  }
  
`;
