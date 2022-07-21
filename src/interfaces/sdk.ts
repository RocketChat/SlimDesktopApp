export interface DDPMessage {
	msg: string;
	fields: {
		eventName: string;
		args: any;
	};
}
