import styled from 'styled-components';
import { useState } from 'react'

const Container = styled.form`
    height: 100%;
`

const Input = styled.input`
    border-radius: 3px;
    padding: 8px 8px;
    margin: 4px 8px;
    border: 1px solid black;
`

const Button = styled.button`
    border: none;
    border-radius: 3px;
    background-color: #2196F3;
    padding: 8px 16px;
    margin: 4px 8px;
    min-width: 100px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    cursor: pointer;
`

export const MessageForm = ({addMessage}) => {
    const [text, setText] = useState('')
    const submitForm = (event) => {
        event.preventDefault()
        addMessage(text)
        setText('')
    }


    return <Container onSubmit={submitForm}>
        <Input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <Button>送信</Button>
    </Container>
}