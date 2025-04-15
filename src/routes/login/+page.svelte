<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
</script>

<div>
	<button
		on:click={async () => {
			await authClient(page.url.origin)
				.signIn.social({
					provider: 'github',
					callbackURL: '/'
				})
				.then(() => {
					goto('/');
				});
		}}
	>
		Continue with GitHub
	</button>
</div>
