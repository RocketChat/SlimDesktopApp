import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { sendTextMessage, editTextMessage } from "../../../util/message.util";
import { useParams } from "react-router-dom";
import { RealtimeAPIMessage } from '../../../interfaces/message';
import { useSelector } from "react-redux";
import EmojiPicker from "./Attachments/EmojiPicker/EmojiPicker";
import Emoji from "../MessageList/MessageRow/components/MessageBodyRender/Emoji";

const Container = styled.div`
    position: fixed;
    bottom: 0px;
    width: 97%;
    padding: 0;
    margin: 10px;
    background-color: #FFF;
    display: flex;
    box-shadow: 0 0 10px #cbced1;
`

const TextInput = styled.textarea`
    width: 100%;
    height: 40px;
    border: 1px solid #cbced1;
    border: none;
    outline: none;
    resize: none;
    padding: 5px;
    box-sizing: border-box;
    color: #2f343d;
    &:focus {
        outline: none !important;
    }

    &::placeholder {
        color: #000;
        vertical-align: middle;
        line-height: 2rem;
    }

    &:focus::placeholder {
        color: transparent;
    }

`

const Action = styled.span`
    line-height: 2rem;
    cursor: pointer;
    padding: 5px;
    ${(props: {dir: string}) => props.dir == "left" ? `border-right: 1px solid #cbced1;` : `border-left: 1px solid #cbced1;`}
`


function MessageForm(props: any) {
    const [isEmojiPickerVisible, setEmojiPickerVisibility] = useState<boolean>(false);
    const [message, setMessage] = useState("");

    const { id: roomId } = useParams();
    const thread = useSelector((state: any) => state.thread);
    const tmid = thread.tmid;

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
            const threadId = props.isThread ? tmid : null;
            return await sendTextMessage(roomId, message, threadId);
        }

        // Edit Existing Message
        const messageToEdit: RealtimeAPIMessage = props.messageToEdit;
        props.setMessageToEdit(null);
        return await editTextMessage(messageToEdit, message);
    }

    const openEmojiPicker = () => {
        setEmojiPickerVisibility(!isEmojiPickerVisible);
    }

    const addEmojiToMessage = (emoji: string) => {
        setMessage(message + `:${emoji}: `);
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
            <Action onClick={openEmojiPicker} dir={"left"}><Emoji emojiHandle={`:smile:`}></Emoji></Action>
            {isEmojiPickerVisible && <EmojiPicker addEmojiToMessage={addEmojiToMessage} />}
            <TextInput placeholder={"Message"} onChange={onMessageChange} onKeyDown={onPressSendMessage} value={message} />
        </Container>
    );
}

export default hot(MessageForm);
