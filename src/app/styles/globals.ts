import {createGlobalStyle} from 'styled-components';
import styledNormalize from 'styled-normalize';

export default createGlobalStyle`
  ${styledNormalize}
  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: Inter, sans-serif;
  }

  #react-page {
    width: 100%;
    height: 100%;
  }
`;
