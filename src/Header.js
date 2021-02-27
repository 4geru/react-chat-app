import styled from 'styled-components';

const Container = styled.header`
  height: 5%;
  display: flex;
  justify-content: space-between;
  padding: 24p 64px 0;
  border-bottom: 1px solid #E0E0E0;
`
const Title = styled.div`
  list-style: none;
  padding: 4px 12px;
  cursor: pointer;white-space: nowrap;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;

  ::before {
    content: "🐵";
    font-size: 25px;
    margin-right: 12px;
  } 
`

export const Header = ({selectedRoom}) => {
    return (
        <Container>
            <Title>
              {selectedRoom}
            </Title>
        </Container>
    )
}
