<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		description,
		href,
		linkText,
		children
	}: {
		description: string;
		href: string;
		linkText: string;
		children: Snippet;
	} = $props();

	const id = $props.id();
</script>

<span class="tip" style:--tip-anchor={`--tip-${id}`}>
	<button type="button" class="term" popovertarget={id}>{@render children()}</button>
	<span class="popup" {id} popover="auto">
		<span class="blurb">{description}</span>
		<a class="btn" rel="external" {href}>{linkText} ↗</a>
	</span>
</span>

<style>
	.term {
		anchor-name: var(--tip-anchor);
		font: inherit;
		color: var(--site-accent);
		background: none;
		border: 0;
		padding: 0;
		border-bottom: 1px dotted var(--site-accent);
		cursor: pointer;
	}
	.term:hover {
		color: var(--site-accent-strong);
		border-bottom-style: solid;
	}
	.popup {
		width: min(22rem, calc(100vw - 2rem));
		max-height: calc(100dvh - 2rem);
		overflow: auto;
		padding: 1rem;
		background: var(--site-panel-raised);
		border: 1px solid var(--site-border);
		box-shadow:
			var(--site-bevel),
			0 0.5rem 2rem #0006;
		color: var(--site-fg);
		font-family: var(--site-font);
		font-size: 0.95rem;
		line-height: 1.65;
	}
	.blurb {
		display: block;
		margin-bottom: 0.85rem;
	}
	@supports (position-area: bottom) {
		.popup {
			position-anchor: var(--tip-anchor);
			position-area: bottom span-right;
			position-try-fallbacks: flip-inline, flip-block;
			inset: auto;
			margin: 0.5rem 0;
		}
	}
</style>
