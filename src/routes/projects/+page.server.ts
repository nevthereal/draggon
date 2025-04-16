import { getUser } from '$lib/server/utils';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const user = getUser();

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
