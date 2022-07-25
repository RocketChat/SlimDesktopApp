import React, { ComponentProps, FC } from 'react';

import Action from './Action';

const Download: FC<Omit<ComponentProps<typeof Action>, 'icon'> & { title?: string | undefined; href: string }> = ({
	title,
	href,
	...props
}) => {
	return (
		<Action
			icon='download'
			href={`${href}?download`}
			title={'Download'}
			is='a'
			target='_blank'
			rel='noopener noreferrer'
			download={title}
			{...props}
		/>
	);
};

export default Download;
