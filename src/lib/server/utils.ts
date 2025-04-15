import { getRequestEvent } from '$app/server';

export const getUser = () => {
	const { locals } = getRequestEvent();

	return locals.user;
};
