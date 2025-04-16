<script lang="ts">
	let { data } = $props();

	const { projects, user } = $derived(data);
</script>

<h3 class="mb-2 text-xl italic">Hi, {user.name}</h3>
<h1 class="h1 mb-4">Overview:</h1>
<div class="mt-4">
	<ul>
		{#each projects as project}
			<li>
				<a href="/projects/{project.id}">{project.name}</a>
			</li>
		{:else}
			no projects...
		{/each}
	</ul>
	<a class="anchor" href="/projects">See all projects</a>
</div>
