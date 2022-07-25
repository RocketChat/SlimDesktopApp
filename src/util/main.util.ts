function cleanURLFromSlash(url: string | undefined): string {
    if(!url) return "";
    return url.replace(/\/+$/, '');
}

export { cleanURLFromSlash }
