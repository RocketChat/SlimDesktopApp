export function setAuthToken(authToken: string){
    localStorage.setItem('rc-auth-token', authToken);
}

export function removeAuthToken(){
    localStorage.removeItem('rc-auth-token');
}

export function getAuthToken(){
    return localStorage.getItem('rc-auth-token');
}


