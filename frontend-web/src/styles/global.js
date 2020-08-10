import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #191920;
        -webkit-font-smoothing: antialiased !important;
    }

    html, body, #root {
        min-height: 100%;
        margin: 0 auto;
        padding: 0 20px 50px;
    }

    body, input, button {
        font-size: 14px;
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }
`;
