import { RealtimeAPIMessage } from "../../interfaces/message";
import { UserStatus } from "../../interfaces/user";
import { createMessageNotification } from "../../util/notifications.util";

const handleNewNotification = (message: RealtimeAPIMessage | undefined) => {
    return (dispatch: any, getState: any) => {
        const status = getState().user.status;
        if(status != UserStatus.BUSY)
            createMessageNotification(message);
    }
}

export { handleNewNotification };
