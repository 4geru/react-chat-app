import styled from 'styled-components';
import { SelectedRoomContext } from "./context/SelectedRoomContext"
import { useState, useContext } from 'react';
import { Input } from './components/input'
import { Button } from './components/button'

const Container = styled.form`
    height: 100%;
    display:flex;
    flex-flow: column;
`

export const RoomModalForm = ({closeModal}) => {
    const [, addRoom] = useContext(SelectedRoomContext);
    const [roomText, setRoomText] = useState('')
    const submitRoomForm = (event) => {
        event.preventDefault()
        addRoom(roomText)
        setRoomText('')
        closeModal()
    }

    return <Container onSubmit={submitRoomForm}>
        <Input
            onChange={(e) => setRoomText(e.target.value)}
            type='text'
            value={roomText}
        />
        <Button>部屋を追加</Button>
    </Container>
}