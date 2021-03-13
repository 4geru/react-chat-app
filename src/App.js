import './App.css';
import { SelectedRoomContext, DEFAULT_ROOM_ID } from "./context/SelectedRoomContext"
import { Header } from './Header'
import { Board } from './Board'
import { MemberPanel } from './MemberPanel'
import { MemberSideModal } from './MemberSideModal'
import { isPcAccess, isMobileAccess } from './lib/browser'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { db } from './firebase'

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
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({ id: DEFAULT_ROOM_ID, name: 'general' });
  const [showSideModal, setShowSideModal] = useState(true);
  const [chats, setChat] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);

  const exitRoom = () => {
    const members = activeMembers.filter(member => member != 'me')

    db.collection('rooms').doc(selectedRoom.id).set({
      actives: members,
    }, { merge: true })
  }

  // 部屋の一覧
  useEffect(() => {
    const unSub = db.collection('rooms').onSnapshot((snap) => {
      setRoom(snap.docs.map((doc) => ({ id: doc.id, name: doc.data().name })))
    })
    return unSub
  }, [selectedRoom])

  // 部屋の設定
  useEffect(() => {
    const unSub = db.collection('rooms').doc(selectedRoom.id).onSnapshot((snap) => {
      setMembers(snap.data().joins)
      setActiveMembers(snap.data().actives)
    })
    return () => {
      exitRoom()
      unSub()
    }
  }, [selectedRoom])

  // chatsの設定
  useEffect(() => {
    const unSub = db.collection('rooms').doc(selectedRoom.id).collection('messages').orderBy('createdAt').onSnapshot((snap) => {
      const chats = snap.docs
        .map((doc) => ({ id: doc.id, message: doc.data().message, userName: doc.data().userName }))
      setChat(chats)
    })
    return unSub
  }, [selectedRoom])

  // activeUserを見る
  useEffect(() => {
    const unSub = db.collection('rooms').onSnapshot((snap) => {
      const currentRoom = snap.docs.find((doc) => doc.id === selectedRoom.id)
      if (!currentRoom.data().actives || !currentRoom.data().actives.includes('me')) {
        const activeMembers = [...currentRoom.data().actives, 'me']

        setActiveMembers(activeMembers)
        db.collection('rooms').doc(selectedRoom.id)
          .set({ actives: activeMembers }, { merge: true })
      }
    })
    return unSub()
  }, [])

  const addMessage = (message) => {
    db.collection('rooms').doc(selectedRoom.id).collection('messages').add({
      userName: 'me',
      message: message,
      createdAt: new Date().toISOString()
    })
    if (!members.includes('me')) {
      db.collection('rooms').doc(selectedRoom.id).set({
        joins: [...members, 'me'],
      }, { merge: true })
    }
  }

  const addRoom = (roomName) => {
    db.collection('rooms').add({
      name: roomName,
      joins: ['me'],
      actives: ['me'],
      messages: [],
      tags: []
    }).then((docRef) => {
      setSelectedRoom({id: docRef.id, name: roomName})
    })
  }

  return (
    <Container className="App">
      <SelectedRoomContext.Provider value={[selectedRoom.id, rooms, {addRoom: addRoom, setSelectedRoom: setSelectedRoom}]}>
        <Header
          selectedRoomName={selectedRoom.name}
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
