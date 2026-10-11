<div class="construction">
	<span class="label">Under Construction</span>
	<p class="message">This section is still being built. Content is coming soon.</p>
</div>

<style>
	.construction {
		position: relative;
		margin-top: 1.5rem;
		padding: 1.2rem 1.15rem 1rem;
		background: var(--site-panel);
		border: 1px solid var(--site-border);
		box-shadow: var(--site-bevel);
	}

	/* hazard stripe */
	.construction::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
		background: repeating-linear-gradient(
			45deg,
			var(--site-accent) 0 0.5rem,
			var(--site-panel-raised) 0.5rem 1rem
		);
	}

	.label {
		display: inline-block;
		margin-bottom: 0.5rem;
		padding: 0.15rem 0.6rem;
		background: var(--site-accent);
		color: var(--site-accent-contrast);
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.message {
		margin: 0;
		color: var(--site-muted);
	}
</style>
