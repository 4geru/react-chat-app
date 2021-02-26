import styled from 'styled-components';
import { useState } from 'react';
import { ControlModal } from './ControlModal';
import { Input } from './components/input'
import { Button } from './components/button'

const Container = styled.div`
    display:flex;
    justify-content: space-around;
    height: 100%;
`

const MessageFormContainer = styled.form`
    height: 100%;
    flex: 5;
`

const ControlContainer = styled.div`
    flex: 1;
`

const ControlButton = styled.button`
    border: none;
    background-color: #2196F3;
    margin: 4px 25px 4px 4px;
    width:37px;
    height:37px;
    background:gold;
    border-radius:100%;
`

const MessageFormInput = styled(Input)`
    width: 50%;
`

export const MessageForm = ({addMessage}) => {
    const [text, setText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const submitForm = (event) => {
        event.preventDefault()
        addMessage(text)
        setText('')
    }

    const openModal = (event) => {
        event.preventDefault();
        setShowModal(true)
    }

    return (
        <Container>
            <MessageFormContainer onSubmit={submitForm}>
                <MessageFormInput
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button>送信</Button>
            </MessageFormContainer>
            <ControlContainer>
                <ControlButton onClick={(e) => { openModal(e) }}>🍣</ControlButton>
            </ControlContainer>
            {
                showModal ?
                    <ControlModal
                        closeModal={() => setShowModal(false)}
                    /> :
                    ''
            }
        </Container>
    )
}