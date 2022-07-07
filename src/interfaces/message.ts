import { User } from './user';

export interface RealtimeAPIMessage {
    _id: string;
    rid: string;
    msg: string;
    ts: any;
    u: User;
    _updatedAt: any;
    urls: string[];
    mentions: string[];
    channels: string[];
    md: {
        type: string;
        value: any;
    }[];
}
