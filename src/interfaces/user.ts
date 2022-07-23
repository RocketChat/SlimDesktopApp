export interface User {
    _id: string;
    username: string;
    name: string;
}

export interface UserResultAPI {
    username: string;
}

export enum UserStatus {
    OFFLINE = 0,
    ONLINE = 1,
    AWAY = 2,
    BUSY = 3
}
