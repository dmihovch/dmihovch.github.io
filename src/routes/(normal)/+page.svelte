<script lang="ts">
	import { resolve } from '$app/paths';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>{profile.name}</title>
</svelte:head>

<h1>{profile.name}</h1>
<p class="tagline">{profile.tagline}</p>

<ul class="meta">
	<li><a rel="external" href={profile.githubUrl}>github</a></li>
	<li><a rel="external" href={profile.resumePdfSrc}>resume</a></li>
	<li><a rel="external" href={profile.transcriptPdfSrc}>transcript</a></li>
</ul>

<h2>projects</h2>
{#each profile.projects as project (project.name)}
	<article class="project">
		<h3>
			{project.name}
			{#if project.githubUrl}
				<a class="source" rel="external" href={project.githubUrl}>source</a>
			{/if}
		</h3>
		<p>{project.description}</p>
	</article>
{/each}

<h2>research</h2>
<p>{profile.research}</p>

<h2>teaching</h2>
<p>
	Friday lectures, review sessions, practice problems, and a Sense HAT emulator are on the
	<a href={resolve('/teaching')}>teaching page</a>.
</p>

<style>
	.tagline {
		color: #9aa3b2;
	}

	.meta {
		display: flex;
		gap: 1.25rem;
		padding: 0;
		margin: 1rem 0 0;
		list-style: none;
		font-size: 0.95rem;
	}

	.project h3 {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
	}

	.project p {
		white-space: pre-line;
		color: #b8c0cc;
	}

	.source {
		font-size: 0.85rem;
	}
</style>
