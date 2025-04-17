import { requireUser } from '$lib/server/utils';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const user = requireUser();

	const pinnedProjects = await db.query.project.findMany({
		where: {
			ownerId: user.id,
			pinned: true,
			archived: false
		}
	});

	return {
		user,
		projects: pinnedProjects
	};
};
