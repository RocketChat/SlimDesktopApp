import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Retry from './Retry';

export default {
	title: 'Components/Retry',
	component: Retry,
} as ComponentMeta<typeof Retry>;

export const Default: ComponentStory<typeof Retry> = (args: any) => <Retry {...args} />;
Default.storyName = 'Retry';
