import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';
import { defineRelations } from 'drizzle-orm';

const client = neon(DATABASE_URL);

const relations = defineRelations(schema, (r) => {
	return {
		user: {
			projects: r.many.project({
				from: r.user.id,
				to: r.project.ownerId
			})
		},
		project: {
			owner: r.one.user({
				from: r.project.ownerId,
				to: r.user.id
			}),
			statuses: r.many.status({
				from: r.project.id,
				to: r.status.projectId
			})
		},
		status: {
			project: r.one.project({
				from: r.status.projectId,
				to: r.project.id
			}),
			tasks: r.many.task({
				from: r.status.id,
				to: r.task.statusId
			})
		},
		task: {
			status: r.one.status({
				from: r.task.statusId,
				to: r.status.id
			}),
			creator: r.one.user({
				from: r.task.creatorId,
				to: r.user.id
			}),
			assignee: r.one.user({
				from: r.task.assigneeId,
				to: r.user.id
			}),
			notes: r.many.note({
				from: r.task.id,
				to: r.note.taskId
			})
		},
		note: {
			task: r.one.task({
				from: r.note.taskId,
				to: r.task.id
			})
		}
	};
});

export const db = drizzle(client, { casing: 'snake_case', relations });
