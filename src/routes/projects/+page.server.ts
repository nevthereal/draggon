import { requireUser } from '$lib/server/utils';
import { fail, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { newProject } from '$lib/arktype';
import { project, status } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

const defaults: typeof newProject.infer = {
	name: '',
	statuses: [
		{ name: 'To Do', color: '#FFB3BA' },        // pastel pink
		{ name: 'In Progress', color: '#B2CEFE' }, // pastel blue
		{ name: 'Done', color: '#B5EAD7' },        // pastel mint green
		{ name: 'Backlog', color: '#E2CFEA' }      // pastel lavender
	]
};

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

		console.log(form.data);

		if (!form.valid) fail(400, { form });
		const [createdProject] = await db
			.insert(project)
			.values({
				name: form.data.name,
				ownerId: user.id
			})
			.returning();

		for (const { name, color } of form.data.statuses) {
			await db.insert(status).values({
				name,
				color,
				projectId: createdProject.id
			});
		}

		return redirect(302, `/projects/${createdProject.id}`);
	}
};
