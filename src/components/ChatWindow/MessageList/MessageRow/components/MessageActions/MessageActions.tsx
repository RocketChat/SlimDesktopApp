import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openThread } from "../../../../../../state/actions";

const Container = styled.div`
    position: absolute;
    right: 25px;
    cursor: pointer;
    z-index: 100;
`

const ActionsModal = styled.div`
    position: absolute;
    right: 25px;
    width: 150px;
    background-color: #FFF;
    border: 1px solid #eeeff1;
    z-index: 100;
`

const ActionsUl = styled.ul`
    list-style-type: none;
    padding: 5px;
`

const ActionsLi = styled.li`
    padding: 2px;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`


function MessageActions(props : any) {
    const [isModalOpen, setModal] = useState(false);
    const dispatch = useDispatch();

    const toggleActionsModal = () => {
        setModal(!isModalOpen);
    }

    const onMessageEdit = () => {
        props.onMessageEdit();
        toggleActionsModal();
    }

    const onMessageDelete = () => {
        props.onMessageDelete();
        toggleActionsModal();
    }

    const onReplyInThread = () => {
        dispatch(openThread(props.id));
    }


    return props.show && (
        <Container>
            <div onClick={toggleActionsModal} style={{padding: '3px'}}>
                <BsThreeDotsVertical style={{color:'#000'}} />
            </div>
            {isModalOpen ? (
                <ActionsModal>
                    <ActionsUl style={{listStyleType:"none"}}>
                        <ActionsLi onClick={onMessageEdit}>Edit Message</ActionsLi>
                        <ActionsLi onClick={onMessageDelete}>Delete Message</ActionsLi>
                        <ActionsLi onClick={onReplyInThread}>Reply In Thread</ActionsLi>
                    </ActionsUl>
                </ActionsModal>
            ): null}
        </Container>
    );
}

export default hot(MessageActions);
