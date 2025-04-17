<script lang="ts">
	let { data } = $props();

	const { projects, user } = $derived(data);
</script>

<h3 class="mb-2 text-xl italic">Hi, {user.name}</h3>
<h1 class="h1 mb-4">Pinned Projects:</h1>
<div class="mt-4">
	<ul>
		{#each projects as project}
			<a href="/projects/{project.id}">
				<div
					class="card preset-filled-surface-50-950 border-surface-200-800 card-hover mb-2 border p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
				>
					<h3 class="h3">
						{project.name}
					</h3>
				</div>
			</a>
		{:else}
			no projects...
		{/each}
	</ul>
	<a class="anchor" href="/projects">See all projects</a>
</div>
