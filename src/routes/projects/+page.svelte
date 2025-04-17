<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	import { MinusCircle, PlusCircle, X } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();

	const { form, enhance, constraints } = superForm(data.newProjectForm, {
		dataType: 'json'
	});

	const pastelColors = [
		{ name: 'Pink', value: '#FFB3BA' },
		{ name: 'Blue', value: '#B2CEFE' },
		{ name: 'Mint', value: '#B5EAD7' },
		{ name: 'Lavender', value: '#E2CFEA' },
		{ name: 'Peach', value: '#FFD6A5' },
		{ name: 'Yellow', value: '#FFFFBA' },
		{ name: 'Green', value: '#CAFFBF' },
		{ name: 'Purple', value: '#BDB2FF' }
	];
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
				<form
					use:enhance
					id="newProjectForm"
					action="?/new"
					method="post"
					class="flex flex-col items-start gap-1"
				>
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
					<div class="mt-4 flex w-full flex-col gap-4">
						<Label.Root for="name" class="text-sm font-medium">Fields/Statuses</Label.Root>
						{#each $form.statuses as status, i (i)}
							<div class="card preset-outlined-surface-200-800 flex justify-baseline gap-4 p-2">
								<div class="flex flex-col gap-2">
									<Label.Root for="name" class="label-text">Name</Label.Root>
									<input
										id="name"
										bind:value={status.name}
										{...$constraints.statuses?.name}
										class="input"
										name="name"
									/>
								</div>

								<div class="flex flex-col gap-2">
									<Label.Root for="color" class="label-text">Color</Label.Root>
									<input
										id="color"
										{...$constraints.statuses?.color}
										type="color"
										bind:value={status.color}
									/>
								</div>
								<button
									type="button"
									class="btn preset-destructive ml-auto"
									onclick={() => {
										$form.statuses = $form.statuses.filter((_, index) => index !== i);
									}}><MinusCircle /></button
								>
							</div>
						{/each}
						<button
							type="button"
							class="btn preset-outlined-surface-200-800 py-2"
							onclick={() => ($form.statuses = [...$form.statuses, { name: '', color: '' }])}
							><PlusCircle /> Add one more</button
						>
					</div>
				</form>
				<div class="flex w-full justify-end">
					<button type="submit" form="newProjectForm" class="btn preset-filled mt-4">Create</button>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{/snippet}
