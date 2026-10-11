<script lang="ts">
	import { resolve } from '$app/paths';
	import MarkdownViewer from '$lib/MarkdownViewer.svelte';
	import { profile } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.resource.title}, {profile.name}</title>
</svelte:head>

<div class="resource-links">
	<a href={resolve('/teaching')}>← Teaching</a>
	<a class="btn" rel="external noopener noreferrer" target="_blank" href={data.resource.githubUrl}
		>View on GitHub ↗</a
	>
</div>

<MarkdownViewer name={data.resource.title} content={data.resource.content} />

<style>
	.resource-links {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-bottom: 1rem;
	}
</style>
