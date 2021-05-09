import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        text-decoration:none;
    }
    a:visited,a {
        color: white;
    }
    html{
        @media (max-width: 1500px) {
            font-size: 85%;
        }
    }
    body{
        background: #1b1b1b;
        font-family: 'Lora','Merriweather';
        
  }
       
    }
    button{
        font-family:'Merriweather';
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 1rem 2rem;
        border: 3px solid #23d997;
        background: transparent;
        color: white;
        transition: all 0.5s ease;
        &:hover {
        background: #23d997;
        color: white;
        }
    }
    h2{
        font-weight: lighter;
        font-size: 4rem;
    }
    h3{
        color:white;
    }
    p{
        padding: 3rem 0rem;
        color: #cccccc;
        font-size: 1.4rem;
        line-height: 150%;
    }
    h4{
        font-size: 2.5rem;
    }
    span{
        font-weight: bold;
        color: #23d997;
    }
    a{
        font-size: 1.1.rem;
    }
`;
export default GlobalStyle;
