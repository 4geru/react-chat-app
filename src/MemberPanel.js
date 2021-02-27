import styled from 'styled-components';

const Container = styled.div`
    margin: 4px;
`

const Ul = styled.ul`
    padding-inline-start: 0px;
`

const Li = styled.li`
    list-style: none;
    padding: 4px 12px;
    cursor: pointer;
    word-break: break-word;
    ::before {
        content: "${({me}) => me ? '🐵' : '🐒' }";
        margin-right: 12px;
    }
`

export const MemberPanel = ({members}) => {
    return <Container>
        members
        <Ul>
            {
                members.map((member, index) =>
                    <Li
                        me={ member ==='me' }
                        key={ index }
                    >
                        {member}
                    </Li>
                )
            }
        </Ul>
    </Container>
}
