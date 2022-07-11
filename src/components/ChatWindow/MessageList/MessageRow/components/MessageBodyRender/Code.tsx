import { Code as ASTCode } from '@rocket.chat/message-parser';
import React, { FC, useEffect, useState } from 'react';

import CodeLine from './CodeLine';

type hljsResult = {
	language: string;
	code: string;
	value: string;
};

const isHljsResult = (result: any): result is hljsResult => result?.value;

const Code: FC<ASTCode> = ({ value = [], language }) => {
	const [code, setCode] = useState<(JSX.Element | null)[] | { language: string; code: string }>(() =>
		value.map((block, index) => {
			switch (block.type) {
				case 'CODE_LINE':
					return <CodeLine key={index} value={block.value} />;
				default:
					return null;
			}
		}),
	);

	return (
		<code className={`code-colors hljs ${language}`}>
			<span className='copyonly'>
				\`\`\`
				<br />
			</span>
			{isHljsResult(code) ? <div dangerouslySetInnerHTML={{ __html: code.code || code.value }} /> : code}
			<span className='copyonly'>
				<br />
				\`\`\`
			</span>
		</code>
	);
};

export default Code;
