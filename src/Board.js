import styled from 'styled-components'
import { MessageForm } from './MessageForm'

const Container = styled.div`
    height: 95%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const MessageContainer = styled.div`
    flex: 18;
`

const FormContainer = styled.div`
    flex: 2;
`

const Message = styled.div`
    position: relative;
    padding: 5px 8px;
    color: #FFF;
    min-height: 20px;

    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    word-break: break-word;
    text-align: left;

    &::after {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        top: 20%;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }
`

const MyMessage = styled(Message)`
    background: #ffcc75;
    margin: 4px 30px 4px 20%;

    &::after {
        right: -11px;
        border-left: 20px solid #ffcc75;
    }
`

const YouMessage = styled(Message)`
    background: #ff8e9d;
    margin: 4px 20% 4px 30px;

    &::after {
        left: -11px;
        border-right: 20px solid #ff8e9d;
    }
`

export const Board = ({chats, addMessage}) => {
    const messageList = chats.map((chat, index) => {
        return (
            (chat.user == 'me') ?
                <MyMessage key={index}>{chat.message}</MyMessage> :
                <YouMessage key={index}>{chat.message}</YouMessage>

        )
    })
    return (
        <Container>
            <MessageContainer>
                { messageList }
            </MessageContainer>
            <FormContainer>
                <MessageForm 
                    addMessage={addMessage}
                />
            </FormContainer>
        </Container>
    )
}