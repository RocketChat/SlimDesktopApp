export interface Room {
    _id: string;

    name: string;
    fname?: string;

    lastMessage?: string;
    lm?: string;
    lastMessageDate?: string;

    avatarLink?: string;

    usernames?: string[];
}
