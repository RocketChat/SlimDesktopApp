import { Rocketchat } from '@rocket.chat/sdk';
import { cleanURLFromSlash } from "../util/main.util";

const host = cleanURLFromSlash(process.env.ROCKETCHAT_URL);
const useSsl = (process.env.ROCKETCHAT_USE_SSL)
? ((process.env.ROCKETCHAT_USE_SSL || '').toString().toLowerCase() === 'true')
: ((host || '').toString().toLowerCase().startsWith('https'));

const sdk = new Rocketchat({ host, protocol: 'ddp', useSsl, reopen: 20000 });

export default sdk;
