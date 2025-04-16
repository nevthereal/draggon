import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const getUser = () => {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return locals.user;
};
