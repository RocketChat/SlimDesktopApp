import { Rocketchat } from '@rocket.chat/sdk';
import { cleanURLFromSlash } from "../util/main.util";
import { setCurrentServer } from "../util/server.util";

if(!process.env.ROCKETCHAT_URL) window.location.reload();

const host = cleanURLFromSlash(process.env.ROCKETCHAT_URL);
const useSsl = (process.env.ROCKETCHAT_USE_SSL)
? ((process.env.ROCKETCHAT_USE_SSL || '').toString().toLowerCase() === 'true')
: ((host || '').toString().toLowerCase().startsWith('https'));

setCurrentServer(host);
const sdk = new Rocketchat({ host, protocol: 'ddp', useSsl, reopen: 20000 });

export default sdk;
