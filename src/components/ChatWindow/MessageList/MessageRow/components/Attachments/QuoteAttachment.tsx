import { MessageQuoteAttachment } from './types';
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
// import colors from '@rocket.chat/fuselage-tokens/colors';
import React, { FC } from 'react';

import Attachments from '.';
// import { useTimeAgo } from '../../../hooks/useTimeAgo';
// import MarkdownText from '../../MarkdownText';
import Attachment from './Attachment';
import { formatAttachmentUrl } from '../../../../../../util/attachments.util';
import ProfileImage from '../../../../../main/ProfileImage/ProfileImage';

const hover = css`
	&:hover,
	&:focus {
		.rcx-attachment__details {
			border-color: #000 !important;
		}
	}
`;

export const QuoteAttachment: FC<MessageQuoteAttachment> = ({
	author_icon: url,
	author_name: name,
	author_link: authorLink,
	message_link: messageLink,
	ts,
	text,
	attachments,
}) => {
	// const format = useTimeAgo();

	return (
		<>
			<Attachment.Content className={hover} width='full'>
				<Attachment.Details
					is='blockquote'
					borderRadius='x2'
					borderWidth='x2'
					borderStyle='solid'
					borderColor='neutral-200'
					borderInlineStartColor='neutral-600'
				>
					<Attachment.Author>
						<ProfileImage username={name} showStatus={false} size="small" />
						<p>{name}</p>
					</Attachment.Author>

					<p>{text}</p>
					{attachments && (
						<Attachment.Inner mbe='-12px'>
							<Attachments attachments={attachments} />
						</Attachment.Inner>
					)}
				</Attachment.Details>
			</Attachment.Content>
		</>
	);
};
