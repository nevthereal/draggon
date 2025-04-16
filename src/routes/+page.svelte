<script lang="ts">
	let { data } = $props();

	const { projects, user } = $derived(data);
</script>

<h3 class="h3 mb-2">Hi, {user.name}</h3>
<h1 class="h1 mb-4">Overview:</h1>
<a class="anchor" href="/projects">See all projects</a>
<div class="mt-4">
	{#each projects as project}
		<a href="/project/{project.id}">{project.name}</a>
	{:else}
		no projects...
	{/each}
</div>
