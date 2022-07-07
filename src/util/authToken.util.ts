export function setAuthToken(authToken: string){
    localStorage.setItem('rc-auth-token', authToken);
}

export function getAuthToken(){
    return localStorage.getItem('rc-auth-token');
}


