import { db } from '$lib/server/db';
import { requireUser } from '$lib/server/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const user = requireUser();

	// Query the project, including statuses and their tasks
	const project = await db.query.project.findFirst({
		where: {
			id
		},
		with: {
			statuses: {
				with: {
					tasks: true
				}
			}
		}
	});

	if (!project) {
		throw error(404, 'Project not found');
	}

	if (project.ownerId !== user.id) {
		throw error(403, 'Unauthorized');
	}

	return { project };
};
