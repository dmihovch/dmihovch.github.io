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
</script>

<span class="tip">
	<button type="button" class="term">{@render children()}</button>
	<span class="popup" role="tooltip">
		<span class="box">
			<span class="blurb">{description}</span>
			<a class="btn" rel="external" {href}>{linkText}</a>
		</span>
	</span>
</span>

<style>
	.tip {
		position: relative;
		display: inline-block;
	}

	.term {
		font: inherit;
		color: var(--site-accent);
		background: none;
		border: 0;
		padding: 0;
		border-bottom: 1px dotted var(--site-accent);
		cursor: help;
	}

	/* padding, not margin, so the popup's hover area touches the term and the
	   pointer can cross the visual gap without leaving the tooltip. */
	.popup {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 20;
		display: none;
		padding-top: 0.4rem;
	}

	.tip:hover .popup,
	.tip:focus-within .popup {
		display: block;
	}

	.box {
		display: block;
		width: max-content;
		max-width: min(18rem, calc(100vw - 3rem));
		padding: 0.6rem 0.75rem;
		background: var(--site-panel-raised);
		border: 1px solid var(--site-border);
		box-shadow: var(--site-bevel);
	}

	.blurb {
		display: block;
		margin-bottom: 0.6rem;
		color: var(--site-fg);
	}
</style>
