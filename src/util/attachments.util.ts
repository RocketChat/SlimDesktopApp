import { getUserID } from "./user.util";
import { getAuthToken } from "./authToken.util";
import { getCurrentServer } from "./server.util";
export const formatAttachmentUrl = (attachmentUrl: string | undefined): string => {
    const userId = getUserID();
    const token = getAuthToken();
    const server = getCurrentServer();
	if (attachmentUrl && attachmentUrl.startsWith('http')) {
		if (attachmentUrl.includes('rc_token')) {
			return encodeURI(attachmentUrl);
		}
		return encodeURI(`${attachmentUrl}?rc_uid=${userId}&rc_token=${token}`);
	}
	return encodeURI(`${server}${attachmentUrl}?rc_uid=${userId}&rc_token=${token}`);
};
