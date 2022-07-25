import React, { ComponentProps, FC } from 'react';

import Action from './Action';

const Collapse: FC<Omit<ComponentProps<typeof Action>, 'icon'> & { collapsed?: boolean }> = ({ collapsed = false, ...props }) => {
	return <Action title={collapsed ? 'Uncollapse' : 'Collapse'} icon={!collapsed ? 'chevron-down' : 'chevron-left'} {...props} />;
};

export default Collapse;
