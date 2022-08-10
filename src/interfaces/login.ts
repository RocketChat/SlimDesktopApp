export interface LoginCredentials {
    email?: string;
    username?: string;
    user?: string;
    password: string;
}

export interface LoginResultAPI {
    id: string;
    token: string
    type: string;
    tokenExpires: {
        $date: number
    }
}

export interface LoginResultRealtime {
    id: string;
    token: string;
    type: string;
}
