<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="flex items-baseline justify-between gap-4 px-8 py-4">
	<a href="/" class="text-5xl font-bold">D</a>
	<div>
		<a href="/projects" class="text-xl">Projects</a>
	</div>
</nav>
<main class="m-8">
	{@render children()}
</main>
