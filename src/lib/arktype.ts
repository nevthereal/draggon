import { type } from 'arktype';

export const status = type({
	name: 'string',
	color: 'string.hex'
});

export const newProject = type({
	name: 'string',
	statuses: status.array()
});
