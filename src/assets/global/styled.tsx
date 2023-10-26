import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        background-color: #ffffff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
      }
      html {
        font-size: 18px;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      p {
        color: #6d6e70;
      }
      hr {
        border-top: solid 2px #7263a0;
        width: 90%;
        border-left: none;
        border-right: none;
        border-bottom: none;
      }
    `}
  />
);

export default GlobalStyles;
