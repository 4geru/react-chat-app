import './App.css';
import { SelectedRoomContext, DEFAULT_ROOMS } from "./context/SelectedRoomContext"
import { Header } from './Header'
import { Board } from './Board'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  height: 100%;
`

function App() {
  const [rooms, setRoom] = useState({
    [DEFAULT_ROOMS]: {
      chats: [
        { user: 'tom', message: 'Hello' },
        { user: 'bob', message: 'World' }
      ]
    }
  });
  const [selectedRoom, setSelectedRoom] = useState(DEFAULT_ROOMS);
  const [chats, setChat] = useState(rooms[selectedRoom].chats);

  const addMessage = (message) => {
    const chat = {
      user: 'me',
      message: message
    }
    setChat([...chats, chat])
  }

  const roomNames = Object.keys(rooms)

  const addRoom = (roomName) => {
    setSelectedRoom(roomName)
    // ルームがなければ、追加する
    if(!roomNames.includes(roomName)) {
      setRoom({...rooms, [roomName]: {chats: []}})
    }
    switchRoom(roomName)
  }

  const switchRoom = (roomName) => {
    setSelectedRoom(roomName)
    setChat(rooms[roomName] ? rooms[roomName].chats : [])
  }

  return (
    <Container className="App">
      <SelectedRoomContext.Provider value={[selectedRoom, roomNames, {addRoom: addRoom, switchRoom: switchRoom}]}>
        <Header
          selectedRoom={selectedRoom}
        />
        <Board
          chats={chats}
          addMessage={(message) => { addMessage(message) }}
        />
      </SelectedRoomContext.Provider>
    </Container>
  );
}

export default App;
