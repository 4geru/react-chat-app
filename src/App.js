import './App.css';
import { SelectedRoomContext, DEFAULT_ROOM_ID } from "./context/SelectedRoomContext"
import { Header } from './Header'
import { Board } from './Board'
import { MemberPanel } from './MemberPanel'
import { MemberSideModal } from './MemberSideModal'
import { isPcAccess, isMobileAccess } from './lib/browser'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { Button } from '@material-ui/core';

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

const App = ({history}) => {
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({ id: DEFAULT_ROOM_ID, name: 'general' });
  const [showSideModal, setShowSideModal] = useState(true);
  const [chats, setChat] = useState([]);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState({ id: '', displayName: '' });

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if(!user) {
        history.push('login');
        return;
      }

      const userInfo = { id: auth.currentUser.uid, displayName: auth.currentUser.displayName }
      setUser(userInfo);
      db.collection('users').doc(auth.currentUser.uid).set(userInfo, {merge: true})
    })

    return unSub
  }, [])

  useEffect(() => {
    // 部屋の一覧
    const unRoomSub = db.collection('rooms').onSnapshot((snap) => {
      setRoom(snap.docs.map((doc) => ({ id: doc.id, name: doc.data().name })))
    })
    return unRoomSub
  }, [])

  useEffect(() => {
    // chatsの設定
    const unChatSub = db.collection('rooms').doc(selectedRoom.id).collection('messages').orderBy('createdAt').onSnapshot((snap) => {
      const chats = snap.docs
        .map((doc) => ({ id: doc.id, message: doc.data().message, userName: doc.data().userName }))
      setChat(chats)
    })
    // memberの設定
    const unMemberSub = db.collection('rooms').doc(selectedRoom.id).onSnapshot((snap) => {
      const snapMembers = snap.data().joins
      let updateMembers = []
      // 既にログインしたことがあったら
      const index = snapMembers.findIndex((member) => member.userName === 'me')
      if (index !== -1) {
        // false -> true にする
        updateMembers = [...snapMembers.slice(0, index), { userName: 'me', active: true }, ...snapMembers.slice(index + 1, snapMembers.length)]
      } else {
        // 見つからなかったら、新しくユーザーを追加する
        updateMembers = [...snap.data().joins, { userName: 'me', active: true }];
      }
      db.collection('rooms').doc(selectedRoom.id).set({
        joins: updateMembers
      }, { merge: true })
      setMembers(updateMembers)
    })
    return () => {
      unChatSub()
      unMemberSub()
    }
  }, [selectedRoom])

  const addMessage = (message) => {
    db.collection('rooms').doc(selectedRoom.id).collection('messages').add({
      userName: 'me',
      message: message,
      createdAt: new Date().toISOString()
    })
  }

  const switchRoom = (props) => {
    const index = members.findIndex((member) => member.userName === 'me')
    const updateMembers = [...members.slice(0, index), { userName: 'me', active: false }, ...members.slice(index + 1, members.length)]
    db.collection('rooms').doc(selectedRoom.id).set({
      joins: updateMembers
    }, { merge: true })
    setSelectedRoom(props)
  }

  const addRoom = (roomName) => {
    db.collection('rooms').add({
      name: roomName,
      joins: [{ user: 'me', active: true }],
      messages: [],
      tags: []
    }).then((docRef) => {
      setSelectedRoom({id: docRef.id, name: roomName})
    })
  }

  const logout = async () => {
    try {
      await auth.signOut();
      history.push('login');
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container className="App">
      <SelectedRoomContext.Provider value={[selectedRoom.id, rooms, {addRoom: addRoom, switchRoom: switchRoom}]}>
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

      <Button
        onClick={logout}
      >
        ログアウト
      </Button>
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
