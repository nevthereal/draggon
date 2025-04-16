import { requireUser } from '$lib/server/utils';
import { fail, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { newProject } from '$lib/arktype';
import { project } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

const defaults = { name: '' };

export const load: PageServerLoad = async () => {
	const user = requireUser();

	const projects = await db.query.project.findMany({
		where: {
			ownerId: user.id
		}
	});

	const newProjectForm = await superValidate(arktype(newProject, { defaults }));

	return {
		projects,
		newProjectForm
	};
};

export const actions: Actions = {
	new: async ({ request }) => {
		const user = requireUser();

		const form = await superValidate(request, arktype(newProject, { defaults }));

		if (!form.valid) fail(400, { form });
		const [createdProject] = await db
			.insert(project)
			.values({
				name: form.data.name,
				ownerId: user.id
			})
			.returning();

		return redirect(302, `/projects/${createdProject.id}`);
	}
};
