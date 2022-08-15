import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import Emoji from "../../../MessageList/MessageRow/components/MessageBodyRender/Emoji";
import emojis from "./emojiList";

const Container = styled.div`
    position: absolute;
    margin: 0;
    bottom: 50px;
    left: 35px;
    z-index: 9999;
    width: 365px;
    max-width: 100%;
    height: 300px;
    margin-right: 22px;
    padding-bottom: 0;
    white-space: normal;
    background-color: rgba(255, 255, 255, 1);
    overflow-x: hidden;
    overflow-y: scroll;
    box-shadow: 0 0 10px #cbced1;
`;
const Filter = styled.div`
    margin: 0;
`;
const FilterList = styled.ul`
    position: fixed;
    background-color: #FFF;
    padding: 0 5px;
    margin: 0;
    display: flex;
    list-style: none;
`;
const FilterItem = styled.li`
    display: flex;
    padding: 6px 0;
    border-width: 0 0 2px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.2)
    flex-grow: 1;
    justify-content: center;
    a {
        text-decoration: none;
        color: #000;
    }
`;
const Emojis = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const EmojiSections = styled.div``;
const EmojiSectionName = styled.h4`
    margin: 2px 8px;
    padding-top: 50px;
`;
const EmojiContainer = styled.div`
    width: 27px;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: rgba(162, 123, 13, 0.6);
        border-radius: 50%;
    }
`;

function EmojiRender(props: {emojiHandle: string}){
    return (
        <EmojiContainer>
            <Emoji emojiHandle={`:${props.emojiHandle}:`}></Emoji>
        </EmojiContainer>
    );
}

function EmojiSection(props: any){
    const name: string = props.name;

    return(
        <div id={name} ref={props.reference}>
            <EmojiSectionName>{name}</EmojiSectionName>
            <Emojis>
                {
                    emojis[name].map((emoji: string) =>
                        <span key={emoji} onClick={() => props.onEmojiClick(emoji)}>
                            <EmojiRender key={emoji} emojiHandle={emoji} />
                        </span>
                    )
                }
            </Emojis>
        </div>
    );
}



function EmojiPicker(props: any) {
    const references: any = {};
    Object.keys(emojis).map((category) => {
        references[category] = useRef<null | HTMLElement>(null);
    });

    const navigateToEmojiSection = (emojiSection: string) => {
        references[emojiSection] && references[emojiSection].current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <Container>
            <Filter>
                <FilterList>
                    {
                        Object.keys(emojis).map((category) =>
                            <FilterItem key={category}>
                                <a onClick={() => navigateToEmojiSection(category)}>
                                    <EmojiRender emojiHandle={emojis[category][0]} />
                                </a>
                            </FilterItem>
                        )
                    }
                </FilterList>
                <EmojiSections>
                    {
                        Object.keys(emojis).map((category) => <EmojiSection reference={references[category]} key={category} name={category} onEmojiClick={props.addEmojiToMessage} />)
                    }
                </EmojiSections>
            </Filter>
        </Container>
    );
}

export default hot(EmojiPicker);
