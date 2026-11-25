<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatPostDate } from '$lib/blog';
	import SectionPage from '$lib/SectionPage.svelte';
	import { profile } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog, {profile.name}</title>
	<meta name="description" content={`Notes and longer posts by ${profile.name}.`} />
</svelte:head>

<SectionPage slug="blog">
	<div class="posts">
		{#each data.posts as post (post.slug)}
			<article class="panel post-preview">
				<p class="post-date">
					<time datetime={post.date}>{formatPostDate(post.date)}</time>
					{#if post.draft}
						· Draft{/if}
				</p>
				<h2><a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a></h2>
				<p>{post.description}</p>
			</article>
		{:else}
			<p>No posts yet.</p>
		{/each}
	</div>
</SectionPage>

<style>
	.posts {
		display: grid;
		gap: 1.5rem;
		max-width: 72ch;
	}

	.post-preview {
		padding: 1.5rem;
	}

	.post-preview h2 {
		margin-top: 0.5rem;
	}

	.post-preview p {
		color: var(--site-muted);
	}

	.post-date {
		font-size: 0.85rem;
	}
</style>
