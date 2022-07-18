function cleanURLFromHttp(url: string | undefined): string {
    if(!url) return "";
    return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

export { cleanURLFromHttp }
