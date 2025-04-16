<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	import { PlusCircle, X } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();

	const { form, enhance, constraints, errors } = superForm(data.newProjectForm);
</script>

<div>
	<h1 class="h1 mb-4">Your Projects</h1>
	<div class="card border-surface-200-800 flex flex-col border p-8">
		{@render projectForm()}
		{#each data.projects as prj}
			<a href="/projects/{prj.id}">{prj.name}</a>
		{:else}
			<p class="text-center h4 font-mono italic">No projects</p>
		{/each}
	</div>
</div>

{#snippet projectForm()}
	<Dialog.Root>
		<Dialog.Trigger class="btn preset-filled ml-auto flex items-center gap-2 text-lg font-medium"
			><PlusCircle /> Create Project</Dialog.Trigger
		>
		<Dialog.Portal>
			<Dialog.Overlay
				class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
			/>
			<Dialog.Content
				class="rounded-container bg-surface-50-950 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 border-surface-300-700 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 shadow-2xl outline-hidden sm:max-w-[490px] md:w-full"
			>
				<Dialog.Title class="h3">Create Project</Dialog.Title>
				<Dialog.Close
					class="absolute top-5 right-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98]"
				>
					<div>
						<X class="text-surface-950-50 size-5" />
						<span class="sr-only">Close</span>
					</div>
				</Dialog.Close>
				<Separator.Root class="bg-surface-300-700 mt-2 mb-4 block h-px" />
				<form use:enhance action="?/new" method="post" class="flex flex-col items-start gap-1">
					<Label.Root for="name" class="text-sm font-medium">Project Name</Label.Root>
					<div class="relative w-full">
						<input
							id="name"
							bind:value={$form.name}
							{...$constraints.name}
							class="input"
							placeholder="e.g. Minecraft Base"
							name="name"
						/>
					</div>
				</form>
				<div class="flex w-full justify-end">
					<Dialog.Close class="btn preset-filled mt-4">Create</Dialog.Close>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{/snippet}
