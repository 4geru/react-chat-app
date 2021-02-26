import './App.css';
import { Header } from './Header'
import { Board } from './Board'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  height: 100%;
`

function App() {
  const [chats, setChat] = useState([
    { user: 'tom', message: 'Hello' },
    { user: 'bob', message: 'World' }
  ]);

  const addMessage = (message) => {
    const chat = {
      user: 'me',
      message: message
    }
    setChat([...chats, chat])
  }
  return (
    <Container className="App">
      <Header />
      <Board
        chats={chats}
        addMessage={(message) => { addMessage(message) }}
      />
    </Container>
  );
}

export default App;
