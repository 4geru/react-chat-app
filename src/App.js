import './App.css';
import { Header } from './Header'
import { Board } from './Board'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  height: 100%;
`

function App() {
  const [messages, setMessage] = useState(['Hello', 'World']);

  const addMessage = (message) => {
    setMessage([...messages, message])
  }
  return (
    <Container className="App">
      <Header />
      <Board
        messages={messages}
        addMessage={(message) => { addMessage(message) }}
      />
    </Container>
  );
}

export default App;
