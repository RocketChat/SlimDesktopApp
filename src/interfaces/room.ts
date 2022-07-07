export interface Room {
    id: string;

    name: string;

    lastMessage?: string;
    lm?: string;
    lastMessageDate?: string;

    avatarLink?: string;

    usernames?: string[];
}

export interface RoomResultAPI {
    _id: string;
    name: string;
    fname?: string;

    lastMessage?: string;
    lm?: string;
    lastMessageDate?: string;

    avatarLink?: string;

    usernames?: string[];
}

