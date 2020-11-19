import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        outline: 0;
        box-sizing: border-box;

        &:focus {
            outline: 0;
        }
    }

    body {
        font-family: 'Roboto', 'Segoe UI', Verdana, Arial, sans-serif;
        background: #eee;
        font-weight: 500;
        color: #0A100D;
    }
`;