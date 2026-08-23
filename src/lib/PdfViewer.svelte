<script lang="ts">
	// pdf.js reads browser globals like DOMMatrix at import time, which don't
	// exist during SSR, so it's loaded lazily in the browser only.
	let pdfjs: typeof import('pdfjs-dist') | null = null;

	async function loadPdfjs() {
		if (pdfjs) return pdfjs;
		const mod = await import('pdfjs-dist');
		const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
		mod.GlobalWorkerOptions.workerSrc = worker.default;
		pdfjs = mod;
		return mod;
	}

	let { src }: { src: string } = $props();

	let pageCount = $state(0);
	let current = $state(1);
	let scale = $state(1.4);
	let loading = $state(false);
	let doc = $state<any>(null);
	let canvasEl: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		const source = src;
		loading = true;
		pageCount = 0;
		current = 1;
		let cancelled = false;

		(async () => {
			const { getDocument } = await loadPdfjs();
			const pdf = await getDocument({ url: source }).promise;
			if (cancelled) {
				pdf.destroy();
				return;
			}
			doc = pdf;
			pageCount = pdf.numPages;
			loading = false;
			renderPage(1);
		})();

		return () => {
			cancelled = true;
			doc?.destroy();
			doc = null;
		};
	});

	$effect(() => {
		if (doc) renderPage(current);
	});

	async function renderPage(num: number) {
		if (!doc) return;
		const page = await doc.getPage(num);
		const viewport = page.getViewport({ scale });
		const canvas = canvasEl;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		const dpr = window.devicePixelRatio || 1;
		const outputScale = Math.max(dpr, 1);
		const cssWidth = viewport.width;
		const cssHeight = viewport.height;
		canvas.style.width = cssWidth + 'px';
		canvas.style.height = cssHeight + 'px';
		canvas.width = Math.floor(cssWidth * outputScale);
		canvas.height = Math.floor(cssHeight * outputScale);
		const renderContext = {
			canvasContext: context,
			viewport,
			transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
		};
		await page.render(renderContext).promise;
	}

	function zoom(delta: number) {
		scale = Math.min(3, Math.max(0.4, scale + delta));
		renderPage(current);
	}

	function setPage(num: number) {
		current = Math.min(pageCount, Math.max(1, num));
	}
</script>

<svelte:window
	onkeydown={(e) => {
		const key = e.key.toLowerCase();
		if (e.ctrlKey && (key === '+' || key === '=')) {
			e.preventDefault();
			zoom(0.2);
		} else if (e.ctrlKey && key === '-') {
			e.preventDefault();
			zoom(-0.2);
		} else if (!e.ctrlKey && key === 'p') {
			e.preventDefault();
			setPage(current - 1);
		} else if (!e.ctrlKey && key === 'n') {
			e.preventDefault();
			setPage(current + 1);
		}
	}}
/>

<div class="pdf">
	{#if loading}
		<p class="msg">loading...</p>
	{:else}
		<div class="bar">
			<button onclick={() => setPage(current - 1)} disabled={current <= 1}
				><u>p</u>rev</button
			>
			<span>{current} / {pageCount}</span>
			<button onclick={() => setPage(current + 1)} disabled={current >= pageCount}
				><u>n</u>ext</button
			>
			<button onclick={() => zoom(-0.2)}>ctrl -</button>
			<button onclick={() => zoom(0.2)}>ctrl +</button>
		</div>
		<div class="page">
			<canvas bind:this={canvasEl} class="pdf-page"></canvas>
		</div>
	{/if}
</div>

<style>
	.pdf {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}

	.bar {
		position: sticky;
		top: 0;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		padding: 0.5rem 1rem;
		background: #000;
		border-bottom: 1px solid var(--fg);
		font-family: var(--font-mono);
		color: var(--fg);
	}

	.bar button {
		background: transparent;
		color: var(--fg);
		border: 1px solid var(--fg);
		font-family: var(--font-mono);
		cursor: pointer;
		padding: 0.1rem 0.5rem;
	}

	.bar button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.page {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pdf-page {
		border: 1px solid #1a1a1a;
	}

	.msg {
		color: var(--fg);
		font-family: var(--font-mono);
		padding: 1rem;
	}
</style>