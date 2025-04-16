import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const getUser = () => {
	const { locals } = getRequestEvent();

	return locals.user;
};

export const requireUser = () => {
	const user = getUser();
	if (!user) {
		throw redirect(302, '/login');
	}

	return user;
};
