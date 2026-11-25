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
	<div class="resources">
		{#each teachingResources as resource (resource.slug)}
			<article class="panel resource">
				<h2><a href={resolve(`/teaching/${resource.slug}`)}>{resource.title}</a></h2>
				<p>{resource.summary}</p>
				<a class="btn github" rel="external" href={resource.githubUrl}>GitHub ↗</a>
			</article>
		{/each}
	</div>
</SectionPage>

<style>
	.resources {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(28rem, 100%), 1fr));
		gap: 1.5rem;
	}

	.resource {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1.5rem;
	}

	.resource h2 {
		margin: 0 0 0.5rem;
	}

	.resource p {
		margin: 0 0 0.75rem;
		max-width: 64ch;
		color: var(--site-muted);
	}

	.github {
		margin-top: auto;
		font-size: 0.85rem;
	}
</style>
