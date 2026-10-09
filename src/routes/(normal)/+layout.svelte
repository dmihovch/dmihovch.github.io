<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<div class="site">
	<header>
		<nav>
			<a class="brand" href={resolve('/')}>daniel mihovch</a>
			<a href={resolve('/teaching')}>teaching</a>
			<a href={resolve('/terminal')}>terminal</a>
		</nav>
	</header>

	<main>{@render children()}</main>
</div>

<style>
	.site {
		min-height: 100vh;
		background: #0d1017;
		color: #d7dce5;
		font-family: ui-sans-serif, system-ui, 'Segoe UI', sans-serif;
		line-height: 1.6;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #242b38;
	}

	.brand {
		font-weight: 700;
	}

	a {
		color: #8ab4ff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	main {
		max-width: 46rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 5rem;
	}

	main :global(h1) {
		font-size: 1.6rem;
		margin: 0 0 0.5rem;
	}

	main :global(h2) {
		font-size: 1.15rem;
		margin: 2.25rem 0 0.75rem;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid #242b38;
	}

	main :global(h3) {
		font-size: 1rem;
		margin: 1.25rem 0 0.25rem;
	}

	main :global(p) {
		margin: 0.5rem 0;
	}
</style>
