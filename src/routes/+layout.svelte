<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.ico';
	import { sections } from '$lib/sections';
	import { profile } from '$lib/site';
	import '../app.css';
	import './theme.css';

	let { children } = $props();

	const isHome = (): boolean => page.url.pathname === '/';
	const isSection = (slug: string): boolean => {
		const path = `/${slug}`;
		return page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		href="/fonts/iosevka-regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="site">
	<header class="topbar">
		<nav class="menu" aria-label="primary">
			<a class="brand" href={resolve('/')} aria-current={isHome() ? 'page' : undefined}
				>{profile.name}</a
			>
			{#each sections as section (section.slug)}
				<a
					href={resolve(`/${section.slug}`)}
					aria-current={isSection(section.slug) ? 'page' : undefined}>{section.title}</a
				>
			{/each}
		</nav>
	</header>

	<main>{@render children()}</main>
</div>
