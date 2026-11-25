import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { posts, type BlogPost } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

const articles = import.meta.glob<{ default: Component }>('/src/content/blog/*.md');

export const entries: EntryGenerator = () =>
	posts.map((post: BlogPost): { slug: string } => ({ slug: post.slug }));

export const load: PageLoad = async ({ params }) => {
	const post = posts.find((post: BlogPost): boolean => post.slug === params.slug);
	const loadArticle = articles[`/src/content/blog/${params.slug}.md`];
	if (!post || !loadArticle) {
		error(404, 'Post not found.');
	}
	return { post, content: (await loadArticle()).default };
};
