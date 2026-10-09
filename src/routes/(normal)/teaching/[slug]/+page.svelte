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
	<a href={resolve('/teaching')}>← teaching</a>
	<a class="github" rel="external" href={data.resource.githubUrl}>view on github ↗</a>
</div>

<MarkdownViewer name={data.resource.title} content={data.resource.content} />

<style>
	.resource-links {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-bottom: 0.75rem;
	}

	.resource-links .github {
		font-weight: 600;
	}
</style>
