export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResultAPI {
    status: string;
    data: {
        authToken: string;
        userId: string;
    };
}

export interface LoginResultRealtime {
    id: string;
    token: string;
    type: string;
}
