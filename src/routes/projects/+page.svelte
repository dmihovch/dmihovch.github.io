<script lang="ts">
	import { onMount } from 'svelte';
	import SectionPage from '$lib/SectionPage.svelte';
	import { loadRepositories, type Repositories } from '$lib/github';
	import { projects, type Project } from '$lib/projects';
	import { profile } from '$lib/site';

	let repositories = $state.raw<Repositories>({});
	let status = $state<'idle' | 'loading' | 'ready'>('idle');
	const unavailable = $derived(
		projects.filter((project: Project): boolean => !repositories[project.repository]).length
	);
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});

	function languageColor(language: string): string {
		switch (language) {
			case 'Odin':
				return '#60afff';
			case 'Rust':
				return '#dea584';
			case 'C':
				return '#a8b9cc';
			case 'Makefile':
				return '#a8c97f';
			case 'Shell':
				return '#c4a7e7';
			case 'Assembly':
				return '#e4b86a';
			default:
				return 'var(--site-accent)';
		}
	}

	onMount((): (() => void) => {
		status = 'loading';
		const controller = new AbortController();
		void loadRepositories(fetch, controller.signal).then((result: Repositories): void => {
			if (!controller.signal.aborted) {
				repositories = result;
				status = 'ready';
			}
		});
		return (): void => controller.abort();
	});
</script>

<svelte:head>
	<title>Projects, {profile.name}</title>
	<meta
		name="description"
		content="Selected projects by Daniel Mihovch: a compiler in Odin, finite state automata in Rust, and hardware emulation and audio visualization in C."
	/>
</svelte:head>

{#snippet icon(kind: 'repository' | 'star' | 'fork' | 'branch')}
	<svg
		viewBox="0 0 16 16"
		width="16"
		height="16"
		fill="none"
		stroke="currentColor"
		stroke-width="1.25"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if kind === 'repository'}
			<path d="M3 2h9v12H3a1.5 1.5 0 0 1 0-3h9M3 2a1.5 1.5 0 0 0-1.5 1.5v9M5 4.5h4" />
		{:else if kind === 'star'}
			<path d="m8 1.5 2 4 4.5.7-3.25 3.15.75 4.45-4-2.1-4 2.1.75-4.45L1.5 6.2 6 5.5Z" />
		{:else if kind === 'fork'}
			<circle cx="4" cy="3" r="1.5" /><circle cx="12" cy="3" r="1.5" /><circle
				cx="8"
				cy="13"
				r="1.5"
			/><path d="M4 4.5v2A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-2M8 8v3.5" />
		{:else}
			<circle cx="4" cy="3" r="1.5" /><circle cx="4" cy="13" r="1.5" /><circle
				cx="12"
				cy="4"
				r="1.5"
			/><path d="M4 4.5v7M4 10c0-3 8-1 8-4.5" />
		{/if}
	</svg>
{/snippet}

<SectionPage slug="projects">
	<div class="collection-heading">
		<p><span class="repository-count">{projects.length}</span> selected repositories</p>
		<a rel="external" href={profile.githubUrl}>dmihovch on GitHub ↗</a>
	</div>

	<div class="projects">
		{#each projects as project (project.repository)}
			{@const repositoryUrl = `${profile.githubUrl}/${project.repository}`}
			{@const details = repositories[project.repository]}
			<article class="panel project" aria-labelledby={`project-${project.repository}`}>
				<header class="project-header">
					<div class="repository-title">
						{@render icon('repository')}
						<h2 id={`project-${project.repository}`}>
							<a rel="external" href={repositoryUrl}>{project.repository}</a>
						</h2>
					</div>
					<span class="visibility">Public</span>
				</header>

				<div class="project-body">
					<p class="category">{project.category}</p>
					<p class="description">{project.description}</p>
					<ul class="focus" aria-label="Project focus">
						{#each project.focus as topic (topic)}<li>{topic}</li>{/each}
					</ul>
				</div>

				<div class="repository-details">
					{#if details?.languages.length}
						<div class="language-bar" aria-hidden="true">
							{#each details.languages as language (language.name)}
								<span
									style:--language-color={languageColor(language.name)}
									style:width={`${language.percentage}%`}
								></span>
							{/each}
						</div>
						<ul class="languages" aria-label="Repository languages">
							{#each details.languages as language (language.name)}
								<li>
									<span class="language-dot" style:--language-color={languageColor(language.name)}
									></span>{language.name}
									<span class="percentage">{language.percentage.toFixed(1)}%</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="primary-language">
							<span class="language-dot" style:--language-color={languageColor(project.language)}
							></span>{project.language}
						</p>
					{/if}

					{#if details}
						<div class="statistics">
							<a
								rel="external"
								href={`${repositoryUrl}/stargazers`}
								aria-label={`${details.stars} stars for ${project.repository}`}
								>{@render icon('star')} {details.stars}</a
							>
							<a
								rel="external"
								href={`${repositoryUrl}/forks`}
								aria-label={`${details.forks} forks of ${project.repository}`}
								>{@render icon('fork')} {details.forks}</a
							>
							{#if details.pushedAt}<span class="updated"
									>Last push <time datetime={details.pushedAt}
										>{dateFormatter.format(new Date(details.pushedAt))}</time
									></span
								>{/if}
						</div>
					{/if}
				</div>

				<footer class="project-footer">
					<div class="repository-links">
						<a class="btn" rel="external" href={repositoryUrl}>View source ↗</a>
						<a rel="external" href={`${repositoryUrl}#readme`}>README</a>
					</div>
					{#if details}<span class="branch">{@render icon('branch')} {details.branch}</span>{/if}
				</footer>
			</article>
		{/each}
	</div>

	<p class="sync-status" role="status">
		{#if status === 'loading'}Loading repository details from GitHub…
		{:else if status === 'ready' && unavailable}GitHub details are temporarily unavailable for {unavailable ===
			1
				? 'one project'
				: `${unavailable} projects`}. You can still explore the source and READMEs.
		{:else if status === 'ready'}Repository details from GitHub.
		{:else}Explore the source and READMEs on GitHub.{/if}
	</p>
	<noscript
		><p class="sync-status">
			Enable JavaScript to see repository statistics and language breakdowns from GitHub.
		</p></noscript
	>
</SectionPage>

<style>
	.collection-heading,
	.project-header,
	.repository-title,
	.project-footer,
	.repository-links,
	.statistics,
	.branch {
		display: flex;
		align-items: center;
	}
	.collection-heading {
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin: 1.75rem 0 0.8rem;
		font-size: 0.85rem;
		color: var(--site-muted);
	}
	.collection-heading p {
		margin: 0;
	}
	.repository-count {
		color: var(--site-fg);
	}
	.projects {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	.project {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.project-header {
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.8rem 1rem;
		border-bottom: 1px solid var(--site-border);
		background: var(--site-panel-raised);
	}
	.repository-title {
		min-width: 0;
		gap: 0.5rem;
		color: var(--site-muted);
	}
	.repository-title :global(svg) {
		flex-shrink: 0;
	}
	.project-header h2 {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 1.05rem;
	}
	.visibility {
		border: 1px solid var(--site-border);
		padding: 0 0.4rem;
		color: var(--site-muted);
		font-size: 0.7rem;
	}
	.project-body {
		flex: 1;
		padding: 0.9rem 1rem 1rem;
	}
	.category {
		margin: 0 0 0.45rem;
		font-size: 0.75rem;
		color: var(--site-muted);
	}
	.description {
		margin: 0;
		line-height: 1.65;
	}
	.focus {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
	}
	.focus li {
		padding: 0.1rem 0.4rem;
		border: 1px solid var(--site-border);
		background: var(--site-panel-raised);
		color: var(--site-muted);
		font-size: 0.7rem;
	}
	.repository-details {
		padding: 0 1rem 0.9rem;
	}
	.language-bar {
		display: flex;
		gap: 2px;
		height: 5px;
		margin-bottom: 0.65rem;
		overflow: hidden;
	}
	.language-bar span {
		background: var(--language-color);
	}
	.languages {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 0.85rem;
		padding: 0;
		margin: 0;
		list-style: none;
		font-size: 0.75rem;
	}
	.languages li,
	.primary-language {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}
	.primary-language {
		margin: 0;
		font-size: 0.75rem;
	}
	.language-dot {
		width: 0.5rem;
		height: 0.5rem;
		flex-shrink: 0;
		background: var(--language-color);
	}
	.percentage {
		color: var(--site-muted);
	}
	.statistics {
		flex-wrap: wrap;
		gap: 0.35rem 0.8rem;
		margin-top: 0.85rem;
		font-size: 0.75rem;
		color: var(--site-muted);
	}
	.statistics a {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--site-muted);
		text-decoration: none;
	}
	.updated {
		margin-left: auto;
	}
	.project-footer {
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.6rem;
		border-top: 1px solid var(--site-border);
		padding: 0.75rem 1rem;
	}
	.repository-links {
		flex-wrap: wrap;
		gap: 0.8rem;
		font-size: 0.8rem;
	}
	.repository-links .btn {
		font-size: 0.8rem;
	}
	.branch {
		gap: 0.3rem;
		max-width: 100%;
		color: var(--site-muted);
		font-size: 0.7rem;
		overflow-wrap: anywhere;
	}
	.branch :global(svg) {
		flex-shrink: 0;
	}
	.sync-status {
		margin-top: 1rem;
		color: var(--site-muted);
		font-size: 0.75rem;
	}
	@media (max-width: 42rem) {
		.projects {
			grid-template-columns: 1fr;
		}
	}
</style>
