import { Global, css } from '@emotion/react';
import Header from './components/header';
import Main from './pages/main';

const cssGlobal = css`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #fcfcfc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-width: 500px;
    }
`

function App() {
  return (
    <>
      <Global styles={cssGlobal}/>
      <Header/>
      <Main/>
    </>
  );
}

export default App;
