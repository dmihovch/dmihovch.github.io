<script lang="ts">
	import { resolve } from '$app/paths';
	import type { SiteSection } from '$lib/sections';

	let { section }: { section: SiteSection } = $props();
</script>

<section class="panel preview">
	<h2><a href={resolve(`/${section.slug}`)}>{section.title}</a></h2>
	<p class="blurb">{section.blurb}</p>
	<a class="btn" href={resolve(`/${section.slug}`)}>View {section.title} →</a>
</section>

<style>
	.preview {
		display: grid;
		grid-template-rows: auto 1fr auto;
		padding: 1rem 1.15rem;
	}

	.preview h2 {
		margin: 0 0 0.4rem;
	}

	.blurb {
		margin: 0 0 0.9rem;
		color: var(--site-muted);
	}

	.preview .btn {
		justify-self: start;
	}
</style>
