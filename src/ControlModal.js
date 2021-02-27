import { Modal } from './components/modal';
import { RoomModalForm } from './RoomModalForm';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';

const Container = styled.div`
    width: 240px;
    border-radius: 10px;
    padding: 24px 36px;
    background-color: white;
    border: '2px solid white'

    &:focus-ring { outline: none; }
    &:focus { outline: none; }
`

export const ControlModal = ({closeModal}) => {
    const ref = useRef(null);

    useEffect(() => {
        if(ref.current) ref.current.focus();
    })

    const onBlurCheck = (e) => {
        const currentTarget = e.currentTarget;

        // NOTE: modalの中の要素を変更した時に勝手に閉じないようにする
        // referencce: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                onBulur();
            }
        }, 0);
    }
    const onBulur = () => {
        closeModal();
    }

    return (
        <Modal>
            <Container
                ref={ref}
                onBlur={onBlurCheck}
                tabIndex={0}
            >
                <RoomModalForm
                    closeModal={() => closeModal()}
                />
            </Container>
        </Modal>
    )
}
