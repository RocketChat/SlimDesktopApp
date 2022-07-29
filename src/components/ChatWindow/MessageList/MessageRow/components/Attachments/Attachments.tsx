import { FileProp, MessageAttachmentBase } from './types';
import React, { FC } from 'react';

import { useRef, useEffect, RefObject } from 'react';
import Item from './Item';

const useBlockRendered = <T extends HTMLElement>(): {
	className: string;
	ref: RefObject<T>;
} => {
	const ref = useRef<T>(null);
	useEffect(() => {
		ref.current?.dispatchEvent(new Event('rendered'));
	}, []);
	return { className: 'js-block-wrapper', ref };
};

const Attachments: FC<{ attachments: Array<MessageAttachmentBase>; file?: FileProp }> = ({ attachments = null, file }): any => {
	const { className, ref } = useBlockRendered<HTMLDivElement>();
	return (
		<>
			<div className={className} ref={ref} />
			{attachments?.map((attachment, index) => (
				<Item key={index} file={file} attachment={attachment} />
			))}
		</>
	);
};

export default Attachments;
