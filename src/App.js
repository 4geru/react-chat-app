import './App.css';
import { SelectedRoomContext, DEFAULT_ROOMS } from "./context/SelectedRoomContext"
import { Header } from './Header'
import { Board } from './Board'
import { MemberPanel } from './MemberPanel'
import { MemberSideModal } from './MemberSideModal'
import { isPcAccess, isMobileAccess } from './lib/browser'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  height: 100%;
`

const Body = styled.div`
  height: 95%;
  display: flex;
`

const Content = styled.div`
  height: 100%;
  flex: 8;
`

const SideContent = styled.div`
  height: 100%;
  flex: 2;
  border-left: 1px solid #E0E0E0;
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
  const [showSideModal, setShowSideModal] = useState(true);
  const [chats, setChat] = useState(rooms[selectedRoom].chats);

  const addMessage = (message) => {
    const chat = {
      user: 'me',
      message: message
    }
    const nextChats = [...chats, chat]
    setChat(nextChats)
    setRoom({...rooms, [selectedRoom]: { chats: nextChats }})
  }

  const roomNames = Object.keys(rooms)
  const members = chats.map(chat => (chat.user))

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
        <Body>
          <Content>
            <Board
              chats={chats}
              addMessage={(message) => { addMessage(message) }}
            />
          </Content>
          {
            isPcAccess && // PCからのアクセスの場合は、サイドコンテントを表示する
            <SideContent>
              <MemberPanel
                members={members}
              />
            </SideContent>
          }
        </Body>
      </SelectedRoomContext.Provider>
      {
        isMobileAccess && showSideModal &&
        <MemberSideModal
          closeModal={() => setShowSideModal(false)}
          members={members}
        />
      }
    </Container>
  );
}

export default App;
