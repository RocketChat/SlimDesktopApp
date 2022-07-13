import emojione from 'emojione';
import React from 'react';

export function renderEmoji(message: string) {
	return emojione.shortnameToUnicode(message);
}

type EmojiProps = {
	emojiHandle: string; // :emoji:
	className?: string;
};

const Emoji = ({ emojiHandle, className = undefined }: EmojiProps) => {
	const markup = { __html: `${renderEmoji(emojiHandle)}` };
	return <span className={className} dangerouslySetInnerHTML={markup} />;
}

export default Emoji;
