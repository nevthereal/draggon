import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { username, admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	appName: 'draggon',
	plugins: [admin(), username()]
});

export type Auth = typeof auth;
