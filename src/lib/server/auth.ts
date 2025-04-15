import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from './db/schema';
import { db } from './db';
import { username, admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema
	}),
	socialProviders: {
		github: {
			clientId: GH_CLIENT_ID,
			clientSecret: GH_CLIENT_SECRET
		}
	},
	appName: 'draggon',
	secret: process.env.AUTH_SECRET!,
	plugins: [admin(), username()]
});

export type Auth = typeof auth;
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
