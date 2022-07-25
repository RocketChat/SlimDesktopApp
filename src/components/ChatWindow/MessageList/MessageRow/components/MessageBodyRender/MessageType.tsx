import styled from "styled-components";
import React, { FC } from 'react';
import { RealtimeAPIMessage } from '../../../../../../interfaces/message';

let messageTypes = [
    {
		id: 'r',
		data(message: RealtimeAPIMessage) {
            return `Room name changed to ${message.msg} by ${message.u.username}`;
		},
	},
	{
		id: 'au',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was added by ${message.u.username}`;
		},
	},
	{
		id: 'added-user-to-team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was added to team`;
		},
	},
	{
		id: 'ru',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed by ${message.u.username}`;
		},
	},
	{
		id: 'removed-user-from-team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed from team`;
		},
	},
	{
		id: 'ul',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} left the channel`;
		},
	},
	{
		id: 'ult',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} left the team`;
		},
	},
	{
		id: 'user-converted-to-team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was converted to Team`;
		},
	},
	{
		id: 'user-converted-to-channel',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was converted to Channel`;
		},
	},
	{
		id: 'user-removed-room-from-team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was removed from this team`;
		},
	},
	{
		id: 'user-deleted-room-from-team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was deleted from team`;
		},
	},
	{
		id: 'user-added-room-to-team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was added to this team`;
		},
	},
	{
		id: 'uj',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this room`;
		},
	},
	{
		id: 'ujt',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this team`;
		},
	},
	{
		id: 'ut',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this conversation`;
		},
	},
	{
		id: 'wm',
		data(message: RealtimeAPIMessage) {
            return `Weclome, ${message.u.username}!`;
		},
	},
	{
		id: 'rm',
		data(message: RealtimeAPIMessage) {
            return `${message.u.username} Message removed`;
		},
	},
	// {
	// 	id: 'rtc',
	// 	render(message) {
	// 		return callbacks.run('renderRtcMessage', message);
	// 	},
	// },
	{
		id: 'user-muted',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was muted by ${message.u.username}`;
		},
	},
	{
		id: 'user-unmuted',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was ummuted by ${message.u.username}`;
		},
	},
	{
		id: 'subscription-role-added',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was set ${message.role || ''} by ${message.u.username}`;
		},
	},
	{
		id: 'subscription-role-removed',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed ${message.role || ''} by ${message.u.username}`;
		},
	},
	{
		id: 'room-archived',
		data(message: RealtimeAPIMessage) {
            return `This room was archived by ${message.u.username}`;
		},
	},
	{
		id: 'room-unarchived',
		data(message: RealtimeAPIMessage) {
            return `This room was unarchived by ${message.u.username}`;
		},
	},
	{
		id: 'room-removed-read-only',
		data(message: RealtimeAPIMessage) {
            return `This room is not read-only now by ${message.u.username}`;
		},
	},
	{
		id: 'room-set-read-only',
		data(message: RealtimeAPIMessage) {
            return `This room is read-only now by ${message.u.username}`;
		},
	},
	{
		id: 'room-allowed-reacting',
		data(message: RealtimeAPIMessage) {
            return `This room is allowing reacting now by ${message.u.username}`;
		},
	},
	{
		id: 'room-disallowed-reacting',
		data(message: RealtimeAPIMessage) {
            return `This room is not allowing reacting now by ${message.u.username}`;
		},
	},
	{
		id: 'room_e2e_enabled',
		data(message: RealtimeAPIMessage) {
            return `This room is allowing e2e now by ${message.u.username}`;
		},
	},
	{
		id: 'room_e2e_disabled',
		data(message: RealtimeAPIMessage) {
            return `This room is not allowing e2e now by ${message.u.username}`;
		},
	},
]


const Content = styled.div`
	color: #9ea2a8;
	font-size: 13px;
	margin-left: 4px;
`

const ParseOtherMessageTypes = (props: any) => {
    const message = props.message;
    if(!message.t) return null;

    const processCorrect = () => {
        for(let type of messageTypes){
            if(type.id == message.t) {
                return type.data(message);
            }
        }
        return '';
    }

    return (
        <Content>{processCorrect()}</Content>
    );
}

export default ParseOtherMessageTypes;
