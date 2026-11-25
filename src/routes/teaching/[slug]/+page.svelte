<script lang="ts">
	import { resolve } from '$app/paths';
	import LectureTopics from '$lib/LectureTopics.svelte';
	import { profile } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.resource.title}, {profile.name}</title>
	<meta name="description" content={data.resource.summary} />
</svelte:head>

<div class="resource-links">
	<a href={resolve('/teaching')}>← Teaching</a>
	<a class="btn" rel="external" href={data.resource.githubUrl}>View on GitHub ↗</a>
</div>

<header class="lecture-heading">
	<p class="course">CISC 210 / Systems Programming</p>
	<h1>{data.resource.title}</h1>
	<p class="introduction">{data.resource.summary}</p>
	<p class="instructions">
		Open a topic to browse its examples and notes. Build instructions and command references are
		included with the materials.
	</p>
</header>

<LectureTopics />

<style>
	.resource-links {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-bottom: 2rem;
	}
	.lecture-heading {
		max-width: 80ch;
	}
	.lecture-heading .course {
		margin-bottom: 0.75rem;
		color: var(--site-muted);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.lecture-heading .introduction {
		margin-bottom: 0.75rem;
		font-size: 1.05rem;
	}
	.instructions {
		color: var(--site-muted);
	}
</style>
