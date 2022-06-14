import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import logo from './logo.png';

const Container = styled.div`
    width:100%;
    position:fixed;
    bottom:0;
    padding:15px;
    border-top:1px solid #FFF;
    z-index: 100;
    background-color: #2f343d;
`

function Footer() {
  return (
    <Container>
        <img src={logo} style={{height: '25px'}} />
    </Container>
  );
}

export default hot(Footer);
