import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 24p 64px 0;
  border-bottom: 1px solid #E0E0E0;
`

const HeaderUl = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`

const HeaderLi = styled.li`
  list-style: none;
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: ${({focused}) => focused ? '2px solid #F44336' : ''};

  ::before {
    content: "${({focused}) => focused ? '🍣' : '🍺' }";
  } 
`

export const Header = () => {
    return (
        <Container>
            <HeaderUl>
                <HeaderLi>Chat app</HeaderLi>
            </HeaderUl>
        </Container>
    )
}
