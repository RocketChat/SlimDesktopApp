import { css } from '@rocket.chat/css-in-js';
import { Box, Icon } from '@rocket.chat/fuselage';
import React, { ComponentProps, FC } from 'react';

import ImageBox from './ImageBox';

type LoadProps = ComponentProps<typeof Box> & { load: () => void };

const Load: FC<LoadProps> = ({ load, ...props }) => {
	const clickable = css`
		cursor: pointer;
		background: var(--rxc-color-neutral-100, #000) !important;

		&:hover,
		&:focus {
			background: var(--rxc-color-neutral-300, #000) !important;
		}
	`;
	return (
		<ImageBox className={clickable} {...props} onClick={load}>
			<Icon name='image' color='neutral-700' size='x64' />
			<Box fontScale='h2' color='default'>
				{'Click to load'}
			</Box>
		</ImageBox>
	);
};

export default Load;
