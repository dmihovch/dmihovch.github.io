<script lang="ts">
	import type { Snippet } from 'svelte';
	import { findSection } from '$lib/sections';

	let { slug, children }: { slug: string; children?: Snippet } = $props();

	const section = $derived(findSection(slug));
</script>

{#if section}
	<h1>{section.title}</h1>
	<p class="blurb">{section.blurb}</p>
	{@render children?.()}
{/if}

<style>
	.blurb {
		color: var(--site-muted);
	}
</style>
