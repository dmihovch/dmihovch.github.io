<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import SectionPage from '$lib/SectionPage.svelte';
	import { posters, publication } from '$lib/research';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>Research, {profile.name}</title>
	<meta
		name="description"
		content="Research by Daniel Mihovch: LLM inference on DGX Spark, Vision Transformer activation profiling, and drone swarming. Papers, posters, and presentations."
	/>
</svelte:head>

<SectionPage slug="research">
	<section aria-labelledby="publications-heading">
		<h2 id="publications-heading">Publications</h2>
		<article class="panel publication">
			<p class="format">{publication.status} / {publication.year}</p>
			<h3>
				<a href={resolve('/research/dgx-spark-llm-inference')}>{publication.title}</a>
			</h3>
			<p class="authors">
				{#each publication.authors as author, index (author)}
					{#if author === profile.name}<strong>{author}</strong>{:else}{author}{/if}{index <
					publication.authors.length - 1
						? ', '
						: ''}
				{/each}
			</p>
			<p class="summary">{publication.summary}</p>
			<div class="actions">
				<a class="btn btn-primary" href={resolve('/research/dgx-spark-llm-inference')}
					>About the paper →</a
				>
				<a class="btn" href={asset(publication.pdfSrc)}>Paper (PDF) ↗</a>
				<a class="btn" rel="external" href={publication.doiUrl}>DOI ↗</a>
				<a class="btn" rel="external" href={publication.codeUrl}>Code &amp; data ↗</a>
				<a class="btn" href={asset(publication.citationSrc)} download>BibTeX ↓</a>
			</div>
		</article>
	</section>

	<section aria-labelledby="posters-heading">
		<h2 id="posters-heading">Posters</h2>
		<div class="poster-grid">
			{#each posters as poster (poster.id)}
				<article class="panel poster" id={poster.id}>
					<a
						class="poster-preview"
						href={asset(poster.pdfSrc)}
						aria-label={`View ${poster.title} (PDF)`}
					>
						<img
							src={asset(poster.previewSrc)}
							alt={`Preview of the poster: ${poster.title}`}
							width={poster.previewWidth}
							height={poster.previewHeight}
							loading="lazy"
							decoding="async"
						/>
					</a>
					<div class="poster-content">
						<p class="format">{poster.topic}</p>
						<h3>{poster.title}</h3>
						{#if poster.event || poster.date}
							<p class="format">{[poster.event, poster.date].filter(Boolean).join(' / ')}</p>
						{/if}
						<p class="summary">{poster.summary}</p>
						<div class="actions poster-actions">
							<a class="btn" href={asset(poster.pdfSrc)}>View poster (PDF) ↗</a>
							{#if poster.relatedPublication}
								<a href={resolve('/research/dgx-spark-llm-inference')}>Related paper →</a>
							{/if}
							{#if poster.codeUrl}
								<a rel="external" href={poster.codeUrl}>Code ↗</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section aria-labelledby="presentations-heading">
		<h2 id="presentations-heading">Presentations</h2>
		<article class="panel presentation">
			<div>
				<p class="format">Slides / LLM inference</p>
				<h3>Benchmarking DGX Spark</h3>
			</div>
			<a class="btn" href={asset('/research/short-slides.html')}>View slides →</a>
		</article>
	</section>
</SectionPage>

<style>
	.publication,
	.presentation,
	.poster-content {
		padding: 1.5rem;
	}

	.format,
	.authors,
	.summary {
		color: var(--site-muted);
	}

	.format {
		font-size: 0.8rem;
	}

	.publication h3 {
		max-width: 55ch;
		margin: 0.5rem 0 0.75rem;
		font-size: clamp(1.25rem, 2vw, 1.6rem);
		line-height: 1.4;
	}

	.authors {
		font-size: 0.9rem;
	}

	.authors strong {
		color: var(--site-fg);
	}

	.publication .summary {
		max-width: 85ch;
		margin-block: 1rem 1.25rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.poster-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.poster {
		display: flex;
		flex-direction: column;
		min-width: 0;
		scroll-margin-top: 1.5rem;
	}

	.poster-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 4 / 3;
		padding: 0.75rem;
		border-bottom: 1px solid var(--site-border);
		background: var(--site-panel-raised);
	}

	.poster-preview:hover {
		background: var(--site-border);
	}

	.poster-preview img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.poster-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
	}

	.poster h3 {
		margin: 0.5rem 0;
		font-size: 1.05rem;
		line-height: 1.5;
	}

	.poster .summary {
		margin-bottom: 1.25rem;
		font-size: 0.9rem;
	}

	.poster-actions {
		margin-top: auto;
		font-size: 0.85rem;
	}

	.presentation {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.presentation h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	@media (max-width: 64rem) {
		.poster-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 42rem) {
		.poster-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
