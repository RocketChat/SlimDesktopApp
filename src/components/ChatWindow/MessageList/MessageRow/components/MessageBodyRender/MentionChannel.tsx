import { UserMention as ASTUserMention } from '@rocket.chat/message-parser';
import React, { FC, memo } from 'react';

import { useMessageBodyChannelMentions, useMessageBodyChannelMentionClick } from './contexts/MessageBodyContext';

const mentionStyle = {
	color: '#b68d00',
	backgroundColor: '#fff6d6',
	cursor: 'pointer',
	padding: '0 2px 2px',
	fontWeight: '700'
};


const Mention: FC<{ value: ASTUserMention['value'] }> = ({ value: { value: mention } }) => {
	const mentions = useMessageBodyChannelMentions();
	const mentioned = mentions.find((mentioned) => mentioned.name === mention);
	const onChannelMentionClick = useMessageBodyChannelMentionClick();

	return (
		<>
			{mentioned && (
				<span onClick={onChannelMentionClick(mentioned.id)} className='mention-link mention-link--room' style={mentionStyle}>
					#{mention}
				</span>
			)}
			{!mentioned && `#${mention}`}
		</>
	);
};

export default memo(Mention);
