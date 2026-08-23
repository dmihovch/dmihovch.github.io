<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { parseShell, run, COMMAND_NAMES, type Line, type Tone, type Viewer } from '$lib/shell';
	import { root } from '$lib/content';
	import { buildAbsolute, displayPath, HOME_SEGMENTS, parsePath } from '$lib/filesystem';
	import PdfViewer from '$lib/PdfViewer.svelte';
	import MarkdownViewer from '$lib/MarkdownViewer.svelte';
	import '../app.css';

	const uname = 'dan';
	const hostname = 'portfolio';

	type Entry = { kind: 'input'; text: string; path: string } | { kind: 'output'; lines: Line[] };

	let cwd = $state<string[]>([...HOME_SEGMENTS]);
	let entries = $state<Entry[]>([]);
	let input = $state('');
	let inputEl: HTMLInputElement | undefined = $state();
	let history = $state<string[]>([]);
	let historyIndex = $state(-1);
	let lastCompletion = $state('');
	let completions = $state<Line[]>([]);
	let viewerSrc = $state<Viewer | null>(null);

	function listMatches(matches: string[], key: string) {
		const signature = key + ':' + matches.join('\n');
		if (signature === lastCompletion) return;
		lastCompletion = signature;
		completions = matches.map((m) => ({ text: m }));
		scrollToBottom();
	}

	function clearCompletions() {
		completions = [];
		lastCompletion = '';
	}

	function commit() {
		const raw = input;
		input = '';
		clearCompletions();

		if (raw.trim() === '') {
			entries.push({ kind: 'output', lines: [] });
			return;
		}

		if (history[history.length - 1] !== raw) history.push(raw);
		historyIndex = -1;

		entries.push({ kind: 'input', text: raw, path: displayPath(cwd) });
		const result = run(parseShell(raw), { root, cwd });

		if (result.clear) {
			entries = [];
			return;
		}

		if (result.cwd) cwd = result.cwd;
		entries.push({ kind: 'output', lines: result.lines });

		if (result.open) {
			viewerSrc = result.open;
			inputEl?.blur();
			return;
		}

		scrollToBottom();
	}

	function closeViewer() {
		viewerSrc = null;
		inputEl?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			commit();
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (history.length === 0) return;
			if (historyIndex === -1) historyIndex = history.length - 1;
			else if (historyIndex > 0) historyIndex -= 1;
			input = history[historyIndex];
			moveCursorToEnd();
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (historyIndex === -1) return;
			if (historyIndex < history.length - 1) {
				historyIndex += 1;
				input = history[historyIndex];
			} else {
				historyIndex = -1;
				input = '';
			}
			moveCursorToEnd();
			return;
		}

		if (event.key === 'Tab') {
			event.preventDefault();
			runAutocomplete();
			return;
		}

		if (event.key === 'l' && event.ctrlKey) {
			event.preventDefault();
			entries = [];
			return;
		}
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key === 'c' && event.ctrlKey && viewerSrc) {
			event.preventDefault();
			closeViewer();
		}
	}

	function runAutocomplete() {
		const raw = input.trim();
		if (raw === '') return;

		const tokens = raw.split(/\s+/);
		const [command, ...args] = tokens;

		if (args.length === 0 && !raw.endsWith(' ')) {
			const matches = COMMAND_NAMES.filter((name) => name.startsWith(command));
			if (matches.length === 1) {
				history.push(input);
				historyIndex = -1;
				input = matches[0] + ' ';
				scrollToBottom();
			} else if (matches.length > 1) {
				listMatches(matches, 'cmd:' + command);
			}
			return;
		}

		const pathCommands = ['cd', 'ls', 'cat', 'open'];
		if (!pathCommands.includes(command)) return;

		const partial = args[args.length - 1] ?? '';
		const lastSlash = partial.lastIndexOf('/');
		const dirPart = lastSlash === -1 ? '' : partial.slice(0, lastSlash + 1);
		const base = lastSlash === -1 ? partial : partial.slice(lastSlash + 1);

		let dirSegments: string[];
		if (partial.startsWith('/')) {
			dirSegments = dirPart === '' ? [] : parsePath(dirPart.slice(1));
		} else if (partial.startsWith('~/')) {
			dirSegments = [...HOME_SEGMENTS, ...parsePath(dirPart.slice(2))];
		} else if (partial === '~') {
			dirSegments = [...HOME_SEGMENTS];
		} else {
			dirSegments = buildAbsolute(cwd, parsePath(dirPart)) ?? cwd;
		}

		let node = root;
		let ok = true;
		for (const segment of dirSegments) {
			const next = node.children?.find((c) => c.name === segment);
			if (!next) {
				ok = false;
				break;
			}
			node = next;
		}

		const names = ok && node.children ? node.children.map((c) => c.name) : [];
		const matches = names.filter((name) => name.startsWith(base));

		if (matches.length === 1) {
			const prefix = raw.slice(0, raw.length - partial.length);
			const isDir = node.children?.find((c) => c.name === matches[0])?.type === 'dir';
			input = prefix + dirPart + matches[0] + (isDir ? '/' : '');
			scrollToBottom();
		} else if (matches.length > 1) {
			const common = commonPrefix(matches);
			if (common.length > base.length) {
				const prefix = raw.slice(0, raw.length - partial.length);
				input = prefix + dirPart + common;
				scrollToBottom();
			} else {
				listMatches(matches, 'path:' + partial);
			}
		}
	}

	function handleInput() {
		clearCompletions();
	}

	function commonPrefix(strings: string[]): string {
		if (strings.length === 0) return '';
		let prefix = strings[0];
		for (const s of strings.slice(1)) {
			while (!s.startsWith(prefix)) {
				prefix = prefix.slice(0, -1);
				if (prefix === '') return '';
			}
		}
		return prefix;
	}

	function moveCursorToEnd() {
		requestAnimationFrame(() => {
			if (inputEl) {
				const end = inputEl.value.length;
				inputEl.setSelectionRange(end, end);
			}
		});
	}

	function scrollToBottom() {
		requestAnimationFrame(() => {
			inputEl?.focus();
			window.scrollTo({ top: document.body.scrollHeight });
		});
	}

	function colorClass(tone: Tone | undefined): string {
		return 'tone-' + (tone ?? 'plain');
	}

	$effect(() => {
		inputEl?.focus();
	});
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>dan@portfolio</title>
</svelte:head>

<div class="terminal">
	<div class="content">
		{#each entries as entry}
			{#if entry.kind === 'input'}
				<div class="row input">
					<span class="prompt">{uname}@{hostname}:{entry.path}$</span>
					<span class="cmd">{entry.text}</span>
				</div>
			{:else}
				{#each entry.lines as line}
					<div class="row output">
						{#if line.text === ''}
							<span>&nbsp;</span>
						{:else}
							<span class={colorClass(line.tone)}>{line.text}</span>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}

		<div class="row input">
			<span class="prompt">{uname}@{hostname}:{displayPath(cwd)}$</span>
			<input
				bind:this={inputEl}
				class="term-input"
				bind:value={input}
				onkeydown={handleKeydown}
				oninput={handleInput}
				spellcheck="false"
				autocomplete="off"
				autocapitalize="off"
				autocorrect="off"
				aria-label="terminal input"
			/>
		</div>

		{#each completions as line}
			<div class="row completion">{line.text}</div>
		{/each}
	</div>
</div>

{#if viewerSrc}
	<div class="viewer">
		<div class="viewer-bar">
			<span class="viewer-title">{viewerSrc.kind === 'pdf' ? viewerSrc.src : viewerSrc.name}</span>
			<span class="viewer-hint">ctrl+c to close</span>
		</div>
		{#if viewerSrc.kind === 'pdf'}
			<PdfViewer src={viewerSrc.src} />
		{:else}
			<MarkdownViewer name={viewerSrc.name} content={viewerSrc.content} />
		{/if}
	</div>
{/if}

<style>
	.terminal {
		height: 100vh;
		padding: 1rem;
		cursor: text;
	}

	.content {
		max-width: 900px;
		margin: 0 auto;
	}

	.row {
		font-family: var(--font-mono);
		font-size: 1rem;
		line-height: 1.5;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.prompt {
		color: var(--fg);
	}

	.cmd {
		color: var(--fg);
	}

	.output {
		color: var(--fg);
	}

	.tone-dir {
		font-weight: 700;
	}

	.tone-error {
		color: #ff4444;
	}

	.input {
		display: flex;
		align-items: baseline;
		gap: 0.5ch;
	}

	.term-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--fg);
		font-family: var(--font-mono);
		font-size: 1rem;
		line-height: 1.5;
		caret-color: var(--fg);
		caret-shape: block;
		padding: 0;
		min-width: 1ch;
		width: 100%;
	}

	.completion {
		color: var(--fg);
	}

	.viewer {
		position: fixed;
		inset: 0;
		background: #000;
		z-index: 10;
		display: flex;
		flex-direction: column;
	}

	.viewer-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--fg);
		font-family: var(--font-mono);
		color: var(--fg);
	}

	.viewer-title {
		font-size: 0.9rem;
	}

	.viewer-hint {
		font-size: 0.8rem;
	}

	.viewer :global(.pdf) {
		flex: 1;
		border: none;
		width: 100%;
		min-height: 0;
	}

	.term-input::placeholder {
		color: var(--fg);
		opacity: 0.4;
	}
</style>
