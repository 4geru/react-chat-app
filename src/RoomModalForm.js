import styled from 'styled-components';
import { SelectedRoomContext } from "./context/SelectedRoomContext"
import { useState, useContext } from 'react';
import { Input } from './components/input'
import { Button } from './components/button'

const Container = styled.form`
    display:flex;
    flex-flow: column;
`

const Ul = styled.ul`
    padding-inline-start: 0px;
`

const Li = styled.li`
    list-style: none;
    padding: 4px 12px;
    cursor: pointer;
    word-break: break-word;
    border-bottom: ${({selected}) => selected ? '2px solid #F44336' : ''};
    ::before {
        content: "${({selected}) => selected ? '🐵' : '🙈' }";
        font-size: 20px;
        margin-right: 12px;
    }
`

export const RoomModalForm = ({closeModal}) => {
    const [selectedRoomId, rooms, { addRoom, switchRoom }] = useContext(SelectedRoomContext);
    const [roomText, setRoomText] = useState('')
    const submitRoomForm = (event) => {
        event.preventDefault()
        addRoom(roomText)
        setRoomText('')
        closeModal()
    }

    return <Container onSubmit={submitRoomForm}>
        <Ul>
            {
                rooms.map((room, index) => {
                    return (
                        <Li
                            key={room.id}
                            selected={room.id === selectedRoomId}
                            onClick={() => { switchRoom({id: room.id, name: room.name}); closeModal() }}
                        >
                            {room.name}
                        </Li>

                    )
                })
            }

        </Ul>
        <Input
            onChange={(e) => setRoomText(e.target.value)}
            type='text'
            value={roomText}
        />
        <Button>部屋を追加</Button>
    </Container>
}
