import React, { ComponentProps, FC } from 'react';

import Action from './Action';
import { AiOutlineDownload } from 'react-icons/ai';

const Download: FC<Omit<ComponentProps<typeof Action>, 'icon'> & { title?: string | undefined; href: string }> = ({
	title,
	href,
	...props
}) => {
	return (
		<Action
			href={`${href}`}
			title={'Download'}
			is='a'
			target='_blank'
			rel='noopener noreferrer'
			download={title}
			{...props}
		>
			<AiOutlineDownload style={{color: '#2f343d', fontSize:'22px'}} />
		</Action>
	);
};

export default Download;
