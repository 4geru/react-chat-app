import './App.css';
import { Header } from './Header'
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
`

function App() {
  return (
    <Container className="App">
      <Header />
    </Container>
  );
}

export default App;
