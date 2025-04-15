import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { username, admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	appName: 'draggon',
	secret: process.env.AUTH_SECRET!,
	plugins: [admin(), username()]
});

export type Auth = typeof auth;
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
