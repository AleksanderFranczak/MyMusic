import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,*::after,*::before {
        padding:0;
        margin:0;
        font-size:10px;
        box-sizing:border-box;
        
    }
    html {
        font-size:10px;

        @media(max-width:800px) {
            font-size:8px;
        }
    }

    body {
        font-family:'Montserrat';
        
        
    }
`;

export default GlobalStyle;
