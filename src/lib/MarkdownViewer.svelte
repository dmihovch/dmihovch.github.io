<script lang="ts">
	let { name, content }: { name: string; content: string } = $props();

	const lines = $derived(content.split('\n'));

	function inline(text: string): string {
		let out = text;
		out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
		out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
		out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
		out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
		return out;
	}

	function headingLevel(line: string): number {
		return line.match(/^#{1,6}\s/)?.[0].trim().length ?? 0;
	}
</script>

<div class="md">
	<div class="md-title">{name}</div>
	{#each lines as line}
		{@const trimmed = line.trim()}
		{#if trimmed === ''}
			<div class="md-blank"></div>
		{:else if trimmed.startsWith('```')}
			<div class="md-fence"></div>
		{:else if trimmed.startsWith('#')}
			{@const h = headingLevel(trimmed)}
			<div class="md-h" style={`--lvl:${h}`}>{@html inline(trimmed.replace(/^#{1,6}\s/, ''))}</div>
		{:else if trimmed.startsWith('- ') || trimmed.startsWith('* ')}
			<div class="md-li">• {@html inline(trimmed.slice(2))}</div>
		{:else if /^\d+\.\s/.test(trimmed)}
			<div class="md-li">{@html inline(trimmed)}</div>
		{:else if trimmed.startsWith('> ')}
			<div class="md-quote">{@html inline(trimmed.slice(2))}</div>
		{:else}
			<div class="md-p">{@html inline(trimmed)}</div>
		{/if}
	{/each}
</div>

<style>
	.md {
		flex: 1;
		min-height: 0;
		overflow: auto;
		padding: 1rem 1.5rem;
		font-family: var(--font-mono);
		color: var(--fg);
		line-height: 1.6;
	}

	.md-title {
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.md-h {
		font-weight: 700;
		margin: 0.8rem 0 0.3rem;
	}

	.md-h[style*='--lvl:1'] {
		font-size: 1.3rem;
	}

	.md-h[style*='--lvl:2'] {
		font-size: 1.15rem;
	}

	.md-h[style*='--lvl:3'] {
		font-size: 1.05rem;
	}

	.md-p {
		margin: 0.2rem 0;
		white-space: pre-wrap;
	}

	.md-li {
		margin: 0.2rem 0 0.2rem 1rem;
	}

	.md-quote {
		border-left: 2px solid var(--fg);
		padding-left: 0.75rem;
		opacity: 0.85;
	}

	.md-fence {
		height: 0.75rem;
		border-bottom: 1px dashed var(--fg);
		opacity: 0.3;
		margin: 0.4rem 0;
	}

	.md-blank {
		height: 0.5rem;
	}

	:global(.md code) {
		background: rgba(255, 255, 255, 0.08);
		padding: 0.05rem 0.3rem;
	}

	:global(.md a) {
		color: var(--fg);
	}
</style>