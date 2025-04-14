import { createAuthClient } from 'better-auth/client';
import type { Auth } from './server/auth';
import { inferAdditionalFields, usernameClient, adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000',
	plugins: [inferAdditionalFields<Auth>(), usernameClient(), adminClient()]
});
