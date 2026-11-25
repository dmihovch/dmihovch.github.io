/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	extensions: ['.svelte', '.md'],
	// Compile posts at build time so readers need no browser-side Markdown parser.
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], highlight: false })],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		})
	}
};

export default config;
