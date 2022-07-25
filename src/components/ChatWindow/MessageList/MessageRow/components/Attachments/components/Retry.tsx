import { css } from '@rocket.chat/css-in-js';
import { Box, Icon } from '@rocket.chat/fuselage';
import React, { FC, ComponentProps } from 'react';

// import { useTranslation } from '../../../../contexts/TranslationContext';
import ImageBox from './ImageBox';

type RetryProps = ComponentProps<typeof Box> & { retry: () => void };

const Retry: FC<RetryProps> = ({ retry }) => {
	// const t = useTranslation();
	const t = (s: string) => s;
	const clickable = css`
		cursor: pointer;
		background: var(--rxc-color-neutral-100, #000) !important;

		&:hover,
		&:focus {
			background: var(--rxc-color-neutral-300, #000) !important;
		}
	`;
	return (
		<ImageBox className={clickable} onClick={retry} size={160}>
			<Icon name='refresh' color='neutral-700' size='x64' />
			<Box fontScale='h2' color='default'>
				{t('Retry')}
			</Box>
		</ImageBox>
	);
};

export default Retry;
