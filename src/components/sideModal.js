import ReactDOM from 'react-dom';
import styled from 'styled-components';

const SideModalRoot = document.getElementById('side-modal-root');

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const SideModal = (props) => {
    return ReactDOM.createPortal(
        <Container>
            { props.children }
        </Container>,
        SideModalRoot
    )
}
