import { isActionAttachment, MarkdownFields, MessageAttachmentDefault } from './types';
import React, { FC, ReactNode } from 'react';

// import MarkdownText from '../../MarkdownText';
import { ActionAttachment } from './ActionAttachtment';
import Attachment from './Attachment';
import FieldsAttachment from './FieldsAttachment';
import { useCollapse } from './hooks/useCollapse';

const applyMarkdownIfRequires = (
	list: MessageAttachmentDefault['mrkdwn_in'] = ['text', 'pretext'],
	key: MarkdownFields,
	text: string,
): ReactNode => (list?.includes(key) ? <p>{text}</p> : text);

const DefaultAttachment: FC<MessageAttachmentDefault> = (attachment) => {
	const [collapsed, collapse] = useCollapse(!!attachment.collapsed);

	return (
		<Attachment.Block
			color={attachment.color}
			pre={
				attachment.pretext && (
					<Attachment.Text>{applyMarkdownIfRequires(attachment.mrkdwn_in, 'pretext', attachment.pretext)}</Attachment.Text>
				)
			}
		>
			<Attachment.Content>
				{attachment.author_name && (
					<Attachment.Author>
						{attachment.author_icon && <Attachment.AuthorAvatar url={attachment.author_icon} />}
						<Attachment.AuthorName
							{...(attachment.author_link && {
								is: 'a',
								href: attachment.author_link,
								target: '_blank',
								color: undefined,
							})}
						>
							{attachment.author_name}
						</Attachment.AuthorName>
					</Attachment.Author>
				)}
				{attachment.title && (
					<Attachment.Row>
						<Attachment.Title
							{...(attachment.title_link && {
								is: 'a',
								href: attachment.title_link,
								target: '_blank',
								color: undefined,
							})}
						>
							{attachment.title}
						</Attachment.Title>{' '}
						{collapse}
					</Attachment.Row>
				)}
				{!collapsed && (
					<>
						{attachment.text && <Attachment.Text>{applyMarkdownIfRequires(attachment.mrkdwn_in, 'text', attachment.text)}</Attachment.Text>}
						{/* {attachment.fields && <FieldsAttachment fields={attachment.mrkdwn_in?.includes('fields') ? attachment.fields.map(({ value, ...rest }) => ({ ...rest, value: <MarkdownText withRichContent={null} content={value} /> })) : attachment.fields} />} */}
						{attachment.fields && (
							<FieldsAttachment
								fields={attachment.fields.map((field) => {
									if (!field.value) {
										return field;
									}

									const { value, title, ...rest } = field;

									return {
										...rest,
										title: <p>{title.replace(/(.*)/g, (line: string) => `${line}  `)}</p>,
										value: <p>{value.replace(/(.*)/g, (line: string) => `${line}  `)}</p>,
									};
								})}
							/>
						)}
						{attachment.image_url && <Attachment.Image {...(attachment.image_dimensions as any)} src={attachment.image_url} />}
						{/* DEPRECATED */}
						{isActionAttachment(attachment) && <ActionAttachment {...attachment} />}
					</>
				)}
			</Attachment.Content>
			{attachment.thumb_url && <Attachment.Thumb url={attachment.thumb_url} />}
		</Attachment.Block>
	);
};

export default DefaultAttachment;
