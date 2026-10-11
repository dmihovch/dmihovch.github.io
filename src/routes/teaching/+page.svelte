<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionPage from '$lib/SectionPage.svelte';
	import { profile } from '$lib/site';
	import { teachingResources } from '$lib/teaching';
</script>

<svelte:head>
	<title>Teaching, {profile.name}</title>
</svelte:head>

<SectionPage slug="teaching">
	{#each teachingResources as resource (resource.slug)}
		<article class="panel resource">
			<h2><a href={resolve(`/teaching/${resource.slug}`)}>{resource.title}</a></h2>
			<p>{resource.summary}</p>
			<a class="btn github" rel="external" href={resource.githubUrl}>GitHub ↗</a>
		</article>
	{/each}
</SectionPage>

<style>
	.resource {
		margin-top: 1.5rem;
		padding: 1rem 1.15rem;
	}

	.resource h2 {
		margin: 0 0 0.5rem;
	}

	.resource p {
		margin: 0 0 0.75rem;
		color: var(--site-muted);
	}

	.github {
		font-size: 0.85rem;
	}
</style>
