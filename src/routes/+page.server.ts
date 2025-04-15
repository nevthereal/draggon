import { getUser } from '$lib/server/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const user = getUser();

	if (!user) return redirect(302, '/login');

	const projects = await db.query.project.findMany({
		where: {
			ownerId: user.id
		}
	});

	return {
		user,
		projects
	};
};
