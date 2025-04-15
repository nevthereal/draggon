import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.sql';

export const project = pgTable('project', {
	id: uuid().primaryKey(),
	name: text().notNull(),
	ownerId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const status = pgTable('status', {
	id: uuid().primaryKey(),
	name: text().notNull(),
	projectId: text()
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' })
});

export const task = pgTable('task', {
	id: uuid().primaryKey(),
	name: text().notNull(),
	statusId: text()
		.notNull()
		.references(() => status.id, { onDelete: 'cascade' }),
	dueDate: timestamp(),
	createdAt: timestamp('created_at').notNull()
});

export const note = pgTable('note', {
	id: uuid().primaryKey(),
	content: json().notNull(),
	taskId: text()
		.notNull()
		.references(() => task.id, { onDelete: 'cascade' })
});
