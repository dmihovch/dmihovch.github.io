<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { publication } from '$lib/research';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>{publication.title}, {profile.name}</title>
	<meta name="description" content={publication.summary} />
	<meta name="citation_title" content={publication.title} />
	{#each publication.authors as author (author)}
		<meta name="citation_author" content={author} />
	{/each}
	<meta name="citation_publication_date" content={publication.publicationDate} />
	<meta name="citation_arxiv_id" content={publication.arxivId} />
	<meta name="citation_doi" content="10.48550/arXiv.2611.20289" />
	<meta name="citation_pdf_url" content={`https://dmihovch.github.io${publication.pdfSrc}`} />
	<link rel="canonical" href="https://dmihovch.github.io/research/dgx-spark-llm-inference/" />
</svelte:head>

<article class="paper">
	<a class="back-link" href={resolve('/research')}>← Research</a>
	<header class="paper-header">
		<p class="format">{publication.status} / {publication.date}</p>
		<h1>{publication.title}</h1>
		<p class="authors">
			{#each publication.authors as author, index (author)}
				{#if author === profile.name}<strong>{author}</strong
					>{:else}{author}{/if}{#if publication.equalContributors.includes(author)}<sup>*</sup
					>{/if}{index < publication.authors.length - 1 ? ', ' : ''}
			{/each}
		</p>
		<p class="equal-contribution">* These authors contributed equally.</p>
		<div class="actions">
			<a class="btn btn-primary" href={asset(publication.pdfSrc)}>Read paper (PDF) ↗</a>
			<a class="btn" rel="external" href={publication.arxivUrl}>arXiv ↗</a>
			<a class="btn" rel="external" href={publication.doiUrl}>DOI ↗</a>
			<a class="btn" rel="external" href={publication.codeUrl}>Code ↗</a>
			<a class="btn" rel="external" href={publication.dataUrl}>Data ↗</a>
			<a class="btn" href={asset('/research/posters/multi-spark-llm-inference.pdf')}
				>Related poster (PDF) ↗</a
			>
		</div>
	</header>

	<div class="paper-overview">
		<section aria-labelledby="abstract-heading">
			<h2 id="abstract-heading">Abstract</h2>
			{#each publication.abstract as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</section>
		<figure class="panel paper-figure">
			<a href={asset(publication.pdfSrc) + '#page=2'} aria-label="Read Figure 1 in the paper (PDF)">
				<img
					src={asset(publication.figureSrc)}
					alt="Scatter plot of peak throughput gain against unloaded decode speedup. Tensor parallelism improves both; pipeline parallelism mainly improves peak throughput."
					width="1084"
					height="842"
				/>
			</a>
			<figcaption>
				Figure 1. Performance gains from distributing a model across two DGX Sparks. Connected
				markers compare tensor and pipeline parallelism for the same checkpoint.
				<a href={asset(publication.pdfSrc) + '#page=2'}>Read the full figure caption ↗</a>
			</figcaption>
		</figure>
	</div>

	<section aria-labelledby="contribution-heading">
		<h2 id="contribution-heading">My contribution</h2>
		<p class="contribution">{publication.contribution}</p>
	</section>

	<section aria-labelledby="materials-heading">
		<h2 id="materials-heading">Research materials</h2>
		<ul class="materials">
			<li>
				<a rel="external" href={publication.codeUrl}>Benchmark harness ↗</a>
				<span>Experiment configuration, orchestration, analysis, and plotting code.</span>
			</li>
			<li>
				<a rel="external" href={publication.dataUrl}>Measurement data ↗</a>
				<span>Campaign index, summaries, logs, and figures used in the paper.</span>
			</li>
			<li>
				<a href={resolve('/research') + '#multi-spark-llm-inference'}>Related poster →</a>
				<span>A preliminary single-checkpoint study preceding the broader benchmark.</span>
			</li>
			<li>
				<a href={asset('/research/short-slides.html')}>Benchmarking DGX Spark slides →</a>
				<span>Presentation on the DGX Spark benchmarking work.</span>
			</li>
		</ul>
	</section>

	<section aria-labelledby="citation-heading">
		<h2 id="citation-heading">Citation</h2>
		<p class="citation">
			{publication.authors.join(', ')}. {publication.title}. arXiv:{publication.arxivId},
			{publication.year}.
		</p>
		<details class="panel bibtex">
			<summary>View BibTeX</summary>
			<pre><code>{publication.bibtex}</code></pre>
		</details>
		<a class="btn citation-download" href={asset(publication.citationSrc)} download
			>Download BibTeX ↓</a
		>
		<p class="license">
			Paper, abstract, and figure by {publication.authors.join(', ')} ({publication.year}), sourced
			from <a rel="external" href={publication.arxivUrl}>arXiv</a> under
			<a rel="external" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. The
			figure is extracted from page 2; its caption is shortened here.
		</p>
	</section>
</article>

<style>
	.paper {
		max-width: 90rem;
		margin-inline: auto;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1.5rem;
	}

	.paper-header {
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--site-border);
	}

	.paper-header h1 {
		max-width: 43ch;
		margin-block: 0.75rem 1.25rem;
		font-size: clamp(1.75rem, 3.2vw, 2.75rem);
		line-height: 1.25;
	}

	.format,
	.equal-contribution,
	.license {
		color: var(--site-muted);
		font-size: 0.8rem;
	}

	.authors {
		max-width: 90ch;
	}

	.authors sup {
		color: var(--site-accent-strong);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.paper-overview {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		align-items: start;
		gap: 2.5rem;
	}

	.paper-overview section {
		min-width: 0;
	}

	.paper-figure {
		min-width: 0;
		margin: 2.5rem 0 0;
	}

	.paper-figure a {
		display: block;
	}

	.paper-figure img {
		display: block;
		width: 100%;
		height: auto;
		background: white;
	}

	figcaption {
		padding: 1.25rem;
		color: var(--site-muted);
		font-size: 0.85rem;
	}

	.materials {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem 2.5rem;
		padding: 0;
		list-style: none;
	}

	.materials span {
		display: block;
		margin-top: 0.3rem;
		color: var(--site-muted);
		font-size: 0.9rem;
	}

	.citation,
	.contribution {
		max-width: 95ch;
	}

	.bibtex {
		margin-top: 1.25rem;
		padding: 1rem 1.25rem;
	}

	.bibtex summary {
		color: var(--site-accent-strong);
		cursor: pointer;
	}

	.bibtex pre {
		max-width: 100%;
		overflow-x: auto;
		font-size: 0.85rem;
	}

	.bibtex code {
		padding: 0;
		border: 0;
		background: transparent;
	}

	.citation-download {
		margin-top: 1rem;
	}

	.license {
		max-width: 110ch;
		margin-top: 1.5rem;
	}

	@media (max-width: 64rem) {
		.paper-overview {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.paper-figure {
			max-width: 42rem;
			margin-top: 1.5rem;
		}
	}

	@media (max-width: 42rem) {
		.materials {
			grid-template-columns: 1fr;
		}
	}
</style>
