<script lang="ts">
	import { resolve } from '$app/paths';
	import type { SiteSection } from '$lib/sections';

	let { section }: { section: SiteSection } = $props();
</script>

<a
	class="panel preview"
	href={resolve(`/${section.slug}`)}
	aria-labelledby={`preview-${section.slug}`}
>
	<div class="preview-heading">
		<h3 id={`preview-${section.slug}`}>{section.title}</h3>
		<span class="arrow" aria-hidden="true">→</span>
	</div>
	<p class="blurb">{section.blurb}</p>
	<span class="preview-footer">
		<span>View {section.title} <span aria-hidden="true">→</span></span>
		{#if !section.custom}<span class="coming-soon">Coming soon</span>{/if}
	</span>
</a>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 12rem;
		padding: 1.25rem 1.5rem;
		color: var(--site-fg);
		text-decoration: none;
	}
	.preview:visited {
		color: var(--site-fg);
	}
	.preview:hover {
		background: var(--site-panel-raised);
		border-color: var(--site-accent);
		color: var(--site-fg);
	}
	.preview-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.preview-heading h3 {
		margin: 0;
		font-size: 1.15rem;
		color: var(--site-accent-strong);
	}
	.arrow {
		color: var(--site-muted);
	}
	.preview:hover .arrow {
		color: var(--site-accent-strong);
	}
	.preview .blurb {
		margin: 0.75rem 0 1.5rem;
		max-width: 48ch;
		color: var(--site-muted);
		font-size: 0.95rem;
	}
	.preview-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-top: auto;
		color: var(--site-accent);
		font-size: 0.8rem;
	}
	.coming-soon {
		color: var(--site-muted);
		font-size: 0.7rem;
	}
</style>
