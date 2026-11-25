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
	<a class="skip-link" href="#main-content">Skip to content</a>
	<header class="topbar">
		<nav class="menu" aria-label="Primary">
			<a class="brand" href={resolve('/')} aria-current={isHome() ? 'page' : undefined}
				>{profile.name}</a
			>
			<div class="menu-links">
				{#each sections as section (section.slug)}
					<a
						href={resolve(`/${section.slug}`)}
						aria-current={isSection(section.slug) ? 'page' : undefined}>{section.title}</a
					>
				{/each}
			</div>
		</nav>
	</header>

	<main id="main-content" tabindex="-1">{@render children()}</main>

	<footer class="site-footer">
		<span>{profile.name}</span>
		<span>Computer Science <span aria-hidden="true">/</span> University of Delaware</span>
		<a rel="external" href={profile.githubUrl}>GitHub ↗</a>
	</footer>
</div>
