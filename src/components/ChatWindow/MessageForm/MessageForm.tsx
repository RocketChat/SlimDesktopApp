import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    bottom: 0px;
    width:97%;
    padding: 10px 20px;
    background-color: #FFF;
`

const TextInput = styled.textarea`
    width: 100%;
    height: 50px;
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


function MessageForm() {
    return (
    <Container>
        <TextInput placeholder={"Message"} />
    </Container>
    );
}

export default hot(MessageForm);
