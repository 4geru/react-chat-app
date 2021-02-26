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

export const Board = ({messages, addMessage}) => {
    const messageList = messages.map((message, index) => {
        return <div key={index}>{message}</div>
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