import { SideModal } from './components/sideModal';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { MemberPanel } from './MemberPanel';

const Container = styled.div`
    height: 90%;
    width: 240px;
    right: 0px;
    position: absolute;
    margin: 0 0 0 auto;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 24px 36px;
    background-color: white;
    border: 2px solid #E0E0E0;

    &:focus-ring { outline: none; }
    &:focus { outline: none; }

    &.open {
        transform: translateX(0px);
        transition-duration: 300ms;
    }

    &.close {
        transform: translateX(400px);
        transition-duration: 300ms;
    }
`

export const MemberSideModal = ({closeModal, members}) => {
    const ref = useRef(null);

    useEffect(() => {
        if(ref.current) ref.current.focus();
    })

    const onBlurCheck = (e) => {
        const currentTarget = e.currentTarget;

        // NOTE: modalの中の要素を変更した時に勝手に閉じないようにする
        // referencce: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
        setTimeout(() => {
            currentTarget.classList.add('close')
            setTimeout(() => {
                onBulur();
            }, 400)
        }, 0);
    }
    const onBulur = () => {
        closeModal();
    }

    return (
        <SideModal>
            <Container
                ref={ref}
                onBlur={onBlurCheck}
                tabIndex={0}
            >
                <MemberPanel members={members}/>
            </Container>
        </SideModal>
    )
}
