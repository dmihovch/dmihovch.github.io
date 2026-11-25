<script lang="ts">
	import { onMount } from 'svelte';
	import {
		lectureSnapshot,
		lectureMaterialUrl,
		loadLectureTopics,
		type LectureCollection
	} from '$lib/lectures';

	let collection = $state.raw<LectureCollection>(lectureSnapshot);
	let status = $state<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');

	onMount((): (() => void) => {
		const controller = new AbortController();
		status = 'loading';
		void loadLectureTopics(fetch, controller.signal).then(
			(result: LectureCollection | null): void => {
				if (controller.signal.aborted) return;
				if (result) collection = result;
				status = result ? 'ready' : 'unavailable';
			}
		);
		return (): void => controller.abort();
	});
</script>

<div class="collection-heading">
	<h2 id="topics-heading">Topics &amp; materials</h2>
	<p role="status">
		{#if status === 'loading'}Checking for updated materials…
		{:else if status === 'ready'}Topics and materials updated from GitHub.
		{:else if status === 'unavailable'}Live updates are unavailable. Showing the saved topic list.
		{:else}Examples, notes, and command references.{/if}
	</p>
</div>

<div class="topics" aria-labelledby="topics-heading">
	{#each collection.topics as topic (topic.path)}
		<article class="panel topic" aria-labelledby={`topic-${encodeURIComponent(topic.path)}`}>
			<h3 id={`topic-${encodeURIComponent(topic.path)}`}>{topic.title}</h3>
			<p class="description">{topic.description}</p>
			<p class="folder">{topic.path}/</p>
			{#if topic.materials.length}
				<details>
					<summary>Browse materials <span>({topic.materials.length})</span></summary>
					<ul class="materials">
						{#each topic.materials as material (material.path)}
							<li>
								<a
									rel="external"
									href={lectureMaterialUrl(collection.branch, material.path, material.kind)}
								>
									{material.name}{material.kind === 'tree' ? '/' : ''}
								</a>
							</li>
						{/each}
					</ul>
				</details>
			{/if}
			<a
				class="topic-link"
				rel="external"
				href={lectureMaterialUrl(collection.branch, topic.path, 'tree')}
				aria-label={`Open ${topic.title} on GitHub`}>Open topic ↗</a
			>
		</article>
	{/each}
</div>

{#if !collection.topics.length}
	<p>
		No lecture topic folders are currently available. Browse the repository for course materials.
	</p>
{/if}

{#if collection.playground}
	<aside class="panel playground">
		<div>
			<h2>Playground</h2>
			<p>A Makefile for compiling individual C files while experimenting with the examples.</p>
		</div>
		<a
			class="btn"
			rel="external"
			href={lectureMaterialUrl(collection.branch, collection.playground, 'blob')}>Open Makefile ↗</a
		>
	</aside>
{/if}

<noscript
	><p class="script-note">
		The saved topic list is available above. Enable JavaScript to check for new materials.
	</p></noscript
>

<style>
	.collection-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin-block: 2.5rem 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--site-border);
	}
	.collection-heading h2 {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 1rem;
	}
	.collection-heading p,
	.script-note {
		margin: 0;
		color: var(--site-muted);
		font-size: 0.8rem;
	}
	.topics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		align-items: start;
		gap: 1.25rem;
	}
	.topic {
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 20rem;
		padding: 1.5rem;
	}
	.topic h3 {
		margin: 0 0 0.5rem;
		color: var(--site-accent-strong);
		font-size: 1.15rem;
		line-height: 1.4;
	}
	.topic .description {
		flex: 1;
		margin: 0.5rem 0 1rem;
		max-width: 55ch;
		color: var(--site-fg);
		font-size: 0.95rem;
	}
	.topic .folder {
		margin: 0 0 0.75rem;
		color: var(--site-muted);
		font-size: 0.8rem;
		overflow-wrap: anywhere;
	}
	details {
		border-top: 1px solid var(--site-border);
		font-size: 0.85rem;
	}
	summary {
		display: list-item;
		padding-block: 0.65rem;
		min-height: 2.75rem;
		cursor: pointer;
		color: var(--site-accent);
	}
	summary:hover {
		color: var(--site-accent-strong);
	}
	summary span {
		color: var(--site-muted);
	}
	.materials {
		margin: 0 0 0.75rem;
		padding: 0;
		list-style: none;
	}
	.materials a {
		display: block;
		padding-block: 0.4rem;
		overflow-wrap: anywhere;
	}
	.topic-link {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		margin-top: 0.5rem;
		font-size: 0.85rem;
	}
	.playground {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		margin-top: 1.5rem;
		padding: 1.25rem 1.5rem;
	}
	.playground h2 {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 1rem;
	}
	.playground p {
		color: var(--site-muted);
		max-width: 70ch;
		font-size: 0.9rem;
	}
	.script-note {
		margin-top: 1rem;
	}
	@media (max-width: 64rem) {
		.topics {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 40rem) {
		.topics {
			grid-template-columns: 1fr;
		}
		.topic {
			min-height: auto;
		}
	}
</style>
