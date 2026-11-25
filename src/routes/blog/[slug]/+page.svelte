<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatPostDate } from '$lib/blog';
	import { profile } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.post.title}, {profile.name}</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="post">
	<a class="back-link" href={resolve('/blog')}>← Blog</a>
	<header class="post-header">
		<p class="post-date">
			<time datetime={data.post.date}>{formatPostDate(data.post.date)}</time>
			{#if data.post.draft}
				· Draft{/if}
		</p>
		<h1>{data.post.title}</h1>
	</header>
	<div class="prose">
		<Content />
	</div>
</article>

<style>
	.post {
		max-width: 72ch;
		margin-inline: auto;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1.5rem;
	}

	.post-header {
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--site-border);
	}

	.post-date {
		color: var(--site-muted);
		font-size: 0.85rem;
	}

	.prose :global(img) {
		display: block;
		max-width: 100%;
		height: auto;
		margin-block: 1.5rem;
	}

	.prose :global(pre) {
		max-width: 100%;
		overflow-x: auto;
		padding: 1rem;
		background: var(--site-panel);
		border: 1px solid var(--site-border);
	}

	.prose :global(pre code) {
		padding: 0;
		background: none;
		border: 0;
	}

	.prose :global(blockquote) {
		margin-inline: 0;
		padding-left: 1rem;
		border-left: 3px solid var(--site-accent);
		color: var(--site-muted);
	}

	.prose :global(table) {
		display: block;
		max-width: 100%;
		overflow-x: auto;
		border-collapse: collapse;
	}

	.prose :global(th),
	.prose :global(td) {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--site-border);
		text-align: left;
	}
</style>
