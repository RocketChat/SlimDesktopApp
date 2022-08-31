import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"

const SearchInputText = styled.input`
  font-size: 15px;
  width: 95%;
  height: 29px;
  background: transparent;
  border: none;
  color: white;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 7px;
  box-shadow: 0 0 1px #cbced1;
  outline:none;
`


function SearchInput(props: any) {

    var typingInterval = 2000;
    var typingTimer:any;

    const searchWord = async (word: string) => {
        await props.goSearchWord(word);
    }

    const searchChange = async (e) => {
        clearInterval(typingTimer);
        typingTimer = setTimeout(() => searchWord(e.target.value), typingInterval)
    }

    return (
        <SearchInputText type="text" placeholder="Search..." onChange={searchChange} />
    );
}

export default hot(SearchInput);
