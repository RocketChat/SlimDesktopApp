import { usePrefersReducedData } from '@rocket.chat/fuselage-hooks';
import React, { useMemo, FC } from 'react';
import { formatAttachmentUrl } from '../../../../../../../util/attachments.util';
import { AttachmentContext, AttachmentContextValue } from '../context/AttachmentContext';

const AttachmentProvider: FC = ({ children }) => {
	const reducedData = usePrefersReducedData();
	const collapsedByDefault = true;
	const autoLoadEmbedMedias = false;
	const saveMobileBandwidth = true;
	const isMobile = false;

	const contextValue: AttachmentContextValue = useMemo(
		() => ({
			getURL: (url: string): string => formatAttachmentUrl(url),
			collapsedByDefault,
			autoLoadEmbedMedias: !reducedData && autoLoadEmbedMedias && (!saveMobileBandwidth || !isMobile),
			dimensions: {
				width: 480,
				height: 360,
			},
		}),
		[collapsedByDefault, reducedData, autoLoadEmbedMedias, saveMobileBandwidth, false],
	);

	return <AttachmentContext.Provider children={children} value={contextValue} />;
};

export default AttachmentProvider;
