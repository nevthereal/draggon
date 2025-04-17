<script lang="ts">
	let { data } = $props();
	const { project } = data;
</script>

<div class="container mx-auto max-w-3xl p-6">
	<div class="mb-8 flex items-center gap-4">
		<div class="rounded-lg bg-gradient-to-br from-surface-200 to-surface-50 p-4 shadow-xl">
			<h1 class="text-4xl font-bold text-surface-900">{project.name}</h1>
			<p class="mt-2 text-surface-600 text-lg">Project ID: <span class="font-mono text-surface-700">{project.id}</span></p>
		</div>
	</div>

	<div class="mb-8">
		<h2 class="text-2xl font-semibold text-surface-800 mb-4">Statuses</h2>
		{#if project.statuses.length > 0}
			<div class="grid gap-6 md:grid-cols-2">
				{#each project.statuses as status}
					<div class="rounded-xl border border-surface-200 bg-surface-50 p-5 shadow-sm hover:shadow-lg transition-shadow duration-200">
						<h3 class="text-xl font-bold text-surface-800 mb-2">{status.name}</h3>
						{#if status.tasks.length > 0}
							<ul class="space-y-2">
								{#each status.tasks as task}
									<li class="flex items-center gap-2 border-l-4 border-primary-400 pl-3 py-1 bg-surface-100 rounded">
										<span class="font-medium text-surface-900">{task.name}</span>
										{#if task.dueDate}
											<span class="ml-auto text-xs text-surface-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
										{/if}
									</li>
								{/each}
							</ul>
						{:else}
							<p class="italic text-surface-400">No tasks in this status.</p>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="italic text-surface-400">No statuses for this project.</p>
		{/if}
	</div>
</div>
