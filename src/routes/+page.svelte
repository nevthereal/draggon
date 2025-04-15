<script lang="ts">
	let { data } = $props();

	const { projects, user } = $derived(data);
</script>

<h1>Hi, {user.name}</h1>
<h2>These are your projects:</h2>
{#each projects as project}
	<a href="/project/{project.id}">{project.name}</a>
{:else}
	no projects {':('}
{/each}
