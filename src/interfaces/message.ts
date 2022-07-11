import { User } from './user';
import { Room } from './room';
import { parse } from '@rocket.chat/message-parser';
export type ChannelMention = Pick<Room, 'id' | 'name'>;
export type UserMention = Pick<User, '_id' | 'name' | 'username'>;
type MentionType = "user" | "team";

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
}
