import React, { ComponentProps, FC } from 'react';

import Action from './Action';
import { AiOutlineArrowRight, AiOutlineArrowDown } from "react-icons/ai";

const Collapse: FC<Omit<ComponentProps<typeof Action>, 'icon'> & { collapsed?: boolean }> = ({ collapsed = false, ...props }) => {
	return <Action title={collapsed ? 'Uncollapse' : 'Collapse'} {...props}>
		{!collapsed ? (
			<AiOutlineArrowDown style={{color: '#2f343d', fontSize:'22px'}} />
		) : (
			<AiOutlineArrowRight style={{color: '#2f343d', fontSize:'22px'}} />
		)}
	</Action>;
};

export default Collapse;
