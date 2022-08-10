import { Rocketchat } from "@rocket.chat/sdk";
import { cleanURLFromSlash } from "../util/main.util";
import { getCurrentServer, setCurrentServer } from "../util/server.util";

class RocketChatSDK {

    static currentSdk: Rocketchat;

    static initialize(host: string, useSsl: boolean){
        host = cleanURLFromSlash(host);
        try {
            const sdkInstance = new Rocketchat({ host, protocol: 'ddp', useSsl, reopen: 20000 });
            setCurrentServer(host);
            RocketChatSDK.currentSdk = sdkInstance;
            return RocketChatSDK.currentSdk;
        } catch(err){
            throw Error('Wrong host or SSL');
        }
    }

    static get sdk(){
        if(RocketChatSDK.currentSdk) return RocketChatSDK.currentSdk;
        const host = cleanURLFromSlash(getCurrentServer());
        return RocketChatSDK.initialize(host, true);;
    }

}

export default RocketChatSDK;
