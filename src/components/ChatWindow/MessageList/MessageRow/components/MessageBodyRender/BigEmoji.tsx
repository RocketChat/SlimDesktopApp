import { BigEmoji as ASTBigEmoji } from '@rocket.chat/message-parser';
import React, { FC } from 'react';
import Emoji from './Emoji';

type BigEmojiProps = {
	value: ASTBigEmoji['value'];
};

const BigEmoji: FC<BigEmojiProps> = ({ value }) => {
	return (
		<Emoji className='big' emojiHandle={`:${value[0].shortCode}:`} />
	);

};

export default BigEmoji;
