import React, { FC } from 'react';
import { RealtimeAPIMessage } from '../../../../../../interfaces/message';

let messageTypes = [
    {
		id: 'r',
		system: true,
		message: 'Room_name_changed',
		data(message: RealtimeAPIMessage) {
            return `Room name changed to ${message.msg} by ${message.u.username}`;
		},
	},
	{
		id: 'au',
		system: true,
		message: 'User_added_by',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was added by ${message.u.username}`;
		},
	},
	{
		id: 'added-user-to-team',
		system: true,
		message: 'Added__username__to_team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was added to team`;
		},
	},
	{
		id: 'ru',
		system: true,
		message: 'User_removed_by',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed by ${message.u.username}`;
		},
	},
	{
		id: 'removed-user-from-team',
		system: true,
		message: 'Removed__username__from_team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed from team`;
		},
	},
	{
		id: 'ul',
		system: true,
		message: 'User_left',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} left the channel`;
		},
	},
	{
		id: 'ult',
		system: true,
		message: 'User_left_team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} left the team`;
		},
	},
	{
		id: 'user-converted-to-team',
		system: true,
		message: 'Converted__roomName__to_team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was converted to Team`;
		},
	},
	{
		id: 'user-converted-to-channel',
		system: true,
		message: 'Converted__roomName__to_channel',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was converted to Channel`;
		},
	},
	{
		id: 'user-removed-room-from-team',
		system: true,
		message: 'Removed__roomName__from_this_team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was removed from this team`;
		},
	},
	{
		id: 'user-deleted-room-from-team',
		system: true,
		message: 'Deleted__roomName__',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was deleted from team`;
		},
	},
	{
		id: 'user-added-room-to-team',
		system: true,
		message: 'added__roomName__to_team',
		data(message: RealtimeAPIMessage) {
            return `Room ${message.msg} was added to this team`;
		},
	},
	{
		id: 'uj',
		system: true,
		message: 'User_joined_channel',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this room`;
		},
	},
	{
		id: 'ujt',
		system: true,
		message: 'User_joined_team',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this team`;
		},
	},
	{
		id: 'ut',
		system: true,
		message: 'User_joined_conversation',
		data(message: RealtimeAPIMessage) {
            return `User ${message.u.username} joined this conversation`;
		},
	},
	{
		id: 'wm',
		system: true,
		message: 'Welcome',
		data(message: RealtimeAPIMessage) {
            return `Weclome, ${message.u.username}!`;
		},
	},
	{
		id: 'rm',
		system: true,
		message: 'Message_removed',
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
		system: true,
		message: 'User_muted_by',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was muted by ${message.u.username}`;
		},
	},
	{
		id: 'user-unmuted',
		system: true,
		message: 'User_unmuted_by',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was ummuted by ${message.u.username}`;
		},
	},
	{
		id: 'subscription-role-added',
		system: true,
		message: '__username__was_set__role__by__user_by_',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was set ${message.role || ''} by ${message.u.username}`;
		},
	},
	{
		id: 'subscription-role-removed',
		system: true,
		message: '__username__is_no_longer__role__defined_by__user_by_',
		data(message: RealtimeAPIMessage) {
            return `User ${message.msg} was removed ${message.role || ''} by ${message.u.username}`;
		},
	},
	{
		id: 'room-archived',
		system: true,
		message: 'This_room_has_been_archived_by__username_',
		data(message: RealtimeAPIMessage) {
            return `This room was archived by ${message.u.username}`;
		},
	},
	{
		id: 'room-unarchived',
		system: true,
		message: 'This_room_has_been_unarchived_by__username_',
		data(message: RealtimeAPIMessage) {
            return `This room was unarchived by ${message.u.username}`;
		},
	},
	{
		id: 'room-removed-read-only',
		system: true,
		message: 'room_removed_read_only',
		data(message: RealtimeAPIMessage) {
            return `This room is not read-only now by ${message.u.username}`;
		},
	},
	{
		id: 'room-set-read-only',
		system: true,
		message: 'room_set_read_only',
		data(message: RealtimeAPIMessage) {
            return `This room is read-only now by ${message.u.username}`;
		},
	},
	{
		id: 'room-allowed-reacting',
		system: true,
		message: 'room_allowed_reacting',
		data(message: RealtimeAPIMessage) {
            return `This room is allowing reacting now by ${message.u.username}`;
		},
	},
	{
		id: 'room-disallowed-reacting',
		system: true,
		message: 'room_disallowed_reacting',
		data(message: RealtimeAPIMessage) {
            return `This room is not allowing reacting now by ${message.u.username}`;
		},
	},
	{
		id: 'room_e2e_enabled',
		system: true,
		message: 'This_room_encryption_has_been_enabled_by__username_',
		data(message: RealtimeAPIMessage) {
            return `This room is allowing e2e now by ${message.u.username}`;
		},
	},
	{
		id: 'room_e2e_disabled',
		system: true,
		message: 'This_room_encryption_has_been_disabled_by__username_',
		data(message: RealtimeAPIMessage) {
            return `This room is not allowing e2e now by ${message.u.username}`;
		},
	},
]




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
        <div style={{color: "#9ea2a8", fontSize:"13px", marginLeft:'4px'}}>{processCorrect()}</div>
    );
}

export default ParseOtherMessageTypes;
