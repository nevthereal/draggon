import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.sql';

export const project = pgTable('project', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	ownerId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const status = pgTable('status', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	projectId: uuid()
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' })
});

export const task = pgTable('task', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	statusId: uuid()
		.notNull()
		.references(() => status.id, { onDelete: 'cascade' }),
	dueDate: timestamp(),
	creatorId: uuid()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	assigneeId: uuid()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull()
});

export const note = pgTable('note', {
	id: uuid().primaryKey().defaultRandom(),
	content: json().notNull(),
	taskId: uuid()
		.notNull()
		.references(() => task.id, { onDelete: 'cascade' })
});
