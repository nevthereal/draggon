import { boolean, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.sql';

export const project = pgTable('project', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	ownerId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	pinned: boolean().notNull().default(false),
	archived: boolean().notNull().default(false),
	createdAt: timestamp().notNull().defaultNow()
});

export const status = pgTable('status', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	projectId: uuid()
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	color: text().notNull()
});

export const task = pgTable('task', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	statusId: uuid()
		.notNull()
		.references(() => status.id, { onDelete: 'cascade' }),
	dueDate: timestamp(),
	creatorId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	assigneeId: text()
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
