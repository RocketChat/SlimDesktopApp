export type Dimensions = {
	width: number;
	height: number;
};


export type FileProp = {
	_id: string;
	name: string;
	type: string;
	format: string;
	size: number;
};

export type MessageAttachmentBase = {
	title?: string;

	ts?: Date;
	collapsed?: boolean;
	description?: string;

	title_link?: string;
	title_link_download?: boolean;
};

export type MessageQuoteAttachment = {
	author_name: string;
	author_link: string;
	author_icon: string;
	message_link?: string;
	text: string;
	attachments?: Array<MessageQuoteAttachment>;
} & MessageAttachmentBase;


export type AudioAttachmentProps = {
	audio_url: string;
	audio_type: string;
	audio_size?: number;
	file?: FileProp;
} & MessageAttachmentBase;

export type ImageAttachmentProps = {
	image_dimensions?: Dimensions;
	image_preview?: string;
	image_url: string;
	image_type: string;
	image_size?: number;
	file?: FileProp;
} & MessageAttachmentBase;

export type VideoAttachmentProps = {
	video_url: string;
	video_type: string;
	video_size: number;
	file?: FileProp;
} & MessageAttachmentBase;


export type FileAttachmentProps = {
	type: 'file';
	file?: FileProp;
} & (VideoAttachmentProps | ImageAttachmentProps | AudioAttachmentProps);

export type PDFAttachmentProps = {
	file: FileProp;
} & MessageAttachmentBase;

type Action = {
    msgId?: string;
    type: 'button';
    text: string;
    msg?: string;
    url?: string;
    image_url?: string;
    is_webview?: true;
    msg_in_chat_window?: true;
    msg_processing_type?: 'sendMessage' | 'respondWithMessage' | 'respondWithQuotedMessage';
};

export type MessageAttachmentAction = {
    button_alignment?: 'horizontal' | 'vertical';
    actions: Array<Action>;
} & MessageAttachmentBase;


export type MarkdownFields = 'text' | 'pretext' | 'fields';

export type FieldProps = {
	short?: boolean;
	title: string;
	value: string;
};

export type MessageAttachmentDefault = {
	author_icon?: string;
	author_link?: string;
	author_name?: string;

	fields?: FieldProps[];

	// footer
	// footer_icon

	image_url?: string;
	image_dimensions?: Dimensions;

	mrkdwn_in?: Array<MarkdownFields>;
	pretext?: string;
	text?: string;

	thumb_url?: string;

	color?: string;
} & MessageAttachmentBase;


export const isQuoteAttachment = (attachment: MessageAttachmentBase): attachment is MessageQuoteAttachment => 'message_link' in attachment;

export const isFileAttachment = (attachment: MessageAttachmentBase): attachment is FileAttachmentProps =>
	'type' in attachment && (attachment as any).type === 'file';


export const isFileAudioAttachment = (attachment: FileAttachmentProps): attachment is AudioAttachmentProps & { type: 'file' } =>
	'audio_url' in attachment;


export const isFileImageAttachment = (attachment: FileAttachmentProps): attachment is ImageAttachmentProps & { type: 'file' } =>
    'image_url' in attachment;

export const isFileVideoAttachment = (attachment: FileAttachmentProps): attachment is VideoAttachmentProps & { type: 'file' } =>
    'video_url' in attachment;

export const isActionAttachment = (attachment: MessageAttachmentBase): attachment is MessageAttachmentAction => 'actions' in attachment;
