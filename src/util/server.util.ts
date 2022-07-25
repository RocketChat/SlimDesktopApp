function getCurrentServer(): string {
    return localStorage.getItem("rc-server") || "";
}

function setCurrentServer(serverUrl: string){
    return localStorage.setItem("rc-server", serverUrl);
}

export { getCurrentServer, setCurrentServer }
