import { RealtimeAPIMessage } from "./message";
export interface Room {
    _id: string;

    name: string;
    fname?: string;
    username?: string;

    lastMessage?: RealtimeAPIMessage;
    lm?: { $date: number };
    lastMessageDate?: string;

    avatarLink?: string;

    usernames?: string[];
}
