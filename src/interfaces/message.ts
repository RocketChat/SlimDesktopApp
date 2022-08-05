import { User } from './user';
import { Room } from './room';
import { parse } from '@rocket.chat/message-parser';
import { FileProp, MessageAttachmentAction, MessageAttachmentDefault, FileAttachmentProps, MessageQuoteAttachment } from "../components/ChatWindow/MessageList/MessageRow/components/Attachments/types";

export type ChannelMention = Pick<Room, '_id' | 'name'>;
export type UserMention = Pick<User, '_id' | 'name' | 'username'>;
type MentionType = "user" | "team";
type MessageAttachment = MessageAttachmentAction | MessageAttachmentDefault | FileAttachmentProps | MessageQuoteAttachment;

export interface RealtimeAPIMessage {
    _id: string;
    rid: string;
    msg: string;
    ts: any;
    u: User;
    _updatedAt: any;
    urls: string[];
    mentions?: ({
        type: MentionType;
    } & Pick<User, "_id" | "username" | "name">)[];
    channels: ChannelMention[];
    md?: ReturnType<typeof parse>;
    role?: string;
    t?: string;
    attachments?: MessageAttachment[];
    file?: FileProp;
	tmid?: string;
	tcount?: number | null;
	tlm?: any;
	replies?: string[];
}
