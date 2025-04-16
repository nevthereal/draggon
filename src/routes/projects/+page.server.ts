import { requireUser } from '$lib/server/utils';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { newProject } from '$lib/arktype';

export const load: PageServerLoad = async () => {
	const user = requireUser();

	const projects = await db.query.project.findMany({
		where: {
			ownerId: user.id
		}
	});

	const newProjectForm = await superValidate(arktype(newProject, { defaults: { name: '' } }));

	return {
		projects,
		newProjectForm
	};
};
