import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { ImCancelCircle } from "react-icons/im";

const Container = styled.div`
    position: relative;
    bottom: 40px;
    width: 97%;
    height: 23px;
    background-color: rgba(255,255,255,0.9);
    border-radius: 25px;
    box-shadow: 0 0 10px #cbced1;
    display: flex;
    margin-left: 10px;
    padding: 5px;
`

const FileName = styled.p`
    margin: 10px 25px;
    line-height: 0;
    flex: 20;
`

function FileToUpload(props: {file: File, clearFileToUpload: () => void}) {
    const file = props.file;

    const cancelFile = () => {
        props.clearFileToUpload();
    }

    return (
        <Container>
            <FileName>File Uploaded: {file.name}</FileName>
            <ImCancelCircle style={{
                position: 'absolute',
                right: '15px',
                flex: 1,
                marginTop: '3px',
                cursor: 'pointer'
            }} onClick={cancelFile} />
        </Container>
    );
}

export default hot(FileToUpload);
