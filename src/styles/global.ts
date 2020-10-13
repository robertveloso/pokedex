import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    @font-face {
        font-family: "SF Pro Display";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url("/assets/fonts/sf-pro-display-regular.ttf");
    }
    font-family: SF Pro Display, Roboto, Lato, "Lucida Grande", Tahoma, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
  }
`
