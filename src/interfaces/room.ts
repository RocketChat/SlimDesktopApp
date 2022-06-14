export default interface Room {
    id: string;
    _id?: string;

    name: string;
    fname?: string;

    lastMessage?: string;
    lm?: string;
    lastMessageDate?: string;

    avatarLink?: string;

    usernames?: string[];
}
