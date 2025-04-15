import { createAuthClient } from 'better-auth/client';
import type { Auth } from './server/auth';
import { inferAdditionalFields, usernameClient, adminClient } from 'better-auth/client/plugins';

export const authClient = (baseURL: string) =>
	createAuthClient({
		baseURL,
		plugins: [inferAdditionalFields<Auth>(), usernameClient(), adminClient()]
	});
