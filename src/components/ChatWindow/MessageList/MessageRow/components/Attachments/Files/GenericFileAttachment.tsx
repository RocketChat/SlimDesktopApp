import { FileProp, MessageAttachmentBase } from '../types';
import React, { FC } from 'react';

// import MarkdownText from '../../../MarkdownText';
// {description && <MarkdownText parseEmoji content={description} />}
import Attachment from '../Attachment';
import { useMediaUrl } from '../context/AttachmentContext';

export type GenericFileAttachmentProps = {
	file?: FileProp;
} & MessageAttachmentBase;

export const GenericFileAttachment: FC<GenericFileAttachmentProps> = ({
	title,
	// collapsed: collapsedDefault = false,
	description,
	title_link: link,
	title_link_download: hasDownload,
	file: {
		size,
		// format,
		// name,
	} = {},
}) => {
	// const [collapsed, collapse] = useCollapse(collapsedDefault);
	const getURL = useMediaUrl();
	return (
		<Attachment>
			<Attachment.Row>
				<p>{description}</p>
				{hasDownload && link ? <Attachment.TitleLink link={getURL(link)} title={title} /> : <Attachment.Title>{title}</Attachment.Title>}
				{size && <Attachment.Size size={size} />}
				{/* {collapse} */}
				{hasDownload && link && <Attachment.Download title={title} href={getURL(link)} />}
			</Attachment.Row>
			{/* { !collapsed && <Attachment.Content>
			<Attachment.Details>
				{hasDownload && link && <Attachment.Download href={link}/>}
				<Attachment.Row><Attachment.Title { ...hasDownload && link && { is: 'a', href: link } } >{name}</Attachment.Title></Attachment.Row>
				<Attachment.Row>{size && <Attachment.Size size={size}/>}<Attachment.Title>{format && size && ' | '}{format}</Attachment.Title></Attachment.Row>
			</Attachment.Details>
		</Attachment.Content> } */}
		</Attachment>
	);
};
