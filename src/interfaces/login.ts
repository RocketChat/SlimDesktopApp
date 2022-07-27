export interface LoginCredentials {
    email: string;
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
