<script lang="ts">
	import type { Snippet } from 'svelte';
	import { findSection } from '$lib/sections';

	let { slug, children }: { slug: string; children?: Snippet } = $props();

	const section = $derived(findSection(slug));
</script>

{#if section}
	<header class="section-header">
		<h1>{section.title}</h1>
		<p class="blurb">{section.blurb}</p>
	</header>
	{@render children?.()}
{/if}

<style>
	.section-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--site-border);
	}

	.blurb {
		max-width: 70ch;
		color: var(--site-muted);
	}
</style>
