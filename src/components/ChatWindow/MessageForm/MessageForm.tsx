import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { sendTextMessage, editTextMessage } from "../../../util/message.util";
import { useParams } from "react-router-dom";
import { RealtimeAPIMessage } from '../../../interfaces/message';

const Container = styled.div`
    position: fixed;
    bottom: 0px;
    width:97%;
    padding: 10px 20px;
    background-color: #FFF;
`

const TextInput = styled.textarea`
    width: 100%;
    height: 40px;
    border: 1px solid #cbced1;
    box-shadow: 0 0 10px #cbced1;
    resize: none;
    padding: 5px;
    box-sizing: border-box;
    color: #2f343d;
    &:focus {
        outline: none !important;
    }
`


function MessageForm(props: any) {
    const { id: roomId } = useParams();
    const [message, setMessage] = useState("");

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const onPressSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            if(await sendMessage()){
                setMessage("");
            }
        }
    }

    const sendMessage = async () => {
        // Send New Message
        if(!props.messageToEdit){
            return await sendTextMessage(roomId, message);
        }

        // Edit Existing Message
        const messageToEdit: RealtimeAPIMessage = props.messageToEdit;
        props.setMessageToEdit(null);
        return await editTextMessage(messageToEdit, message);
    }

    useEffect(() => {
        if(props.messageToEdit){
            setMessage(props.messageToEdit.msg);
        } else {
            setMessage("");
        }
    }, [props.messageToEdit]);

    return (
        <Container>
            <TextInput placeholder={"Message"} onChange={onMessageChange} onKeyDown={onPressSendMessage} value={message} />
        </Container>
    );
}

export default hot(MessageForm);
