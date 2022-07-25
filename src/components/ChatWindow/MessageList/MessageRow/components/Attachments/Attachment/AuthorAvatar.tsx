import React, { FC, useState } from 'react';


import { Avatar, AvatarProps, Skeleton } from '@rocket.chat/fuselage';

export type BaseAvatarProps = Omit<AvatarProps, 'is'>;

const BaseAvatar: FC<BaseAvatarProps> = ({ size, ...props }) => {
	const [error, setError] = useState<unknown>(false);

	if (error) {
		return <Skeleton variant='rect' {...props} />;
	}

	return <Avatar onError={setError} size={size} {...props} />;
};


const AuthorAvatar: FC<{ url: string }> = ({ url }) => <BaseAvatar {...({ url, size: 'x24' } as any)} />;

export default AuthorAvatar;
