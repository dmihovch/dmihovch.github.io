<script lang="ts">
	import { resolve } from '$app/paths';
	import { profile } from '$lib/site';
	import { teachingResources } from '$lib/teaching';
</script>

<svelte:head>
	<title>teaching, {profile.name}</title>
</svelte:head>

<h1>teaching</h1>
<p class="intro">
	I am a teaching assistant at the University of Delaware. This page lists the lecture materials,
	review sessions, practice problems, and tools I write for students.
</p>

{#each teachingResources as resource (resource.slug)}
	<article class="resource">
		<h2><a href={resolve(`/teaching/${resource.slug}`)}>{resource.title}</a></h2>
		<p>{resource.summary}</p>
		<a class="github" rel="external" href={resource.githubUrl}>github ↗</a>
	</article>
{/each}

<style>
	.intro {
		color: #b8c0cc;
	}

	.resource {
		margin-top: 2rem;
	}

	.resource h2 {
		margin-bottom: 0.25rem;
	}

	.resource p {
		color: #b8c0cc;
	}

	.github {
		font-size: 0.9rem;
	}
</style>
