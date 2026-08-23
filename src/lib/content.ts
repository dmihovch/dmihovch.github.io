import type { FSNode } from './filesystem';

const dir = (name: string, children: FSNode[] = []): FSNode => ({ name, type: 'dir', children });
const file = (name: string, content: string): FSNode => ({ name, type: 'file', content });
const doc = (name: string, src: string): FSNode => ({ name, type: 'file', src });

export function findDoc(name: string): FSNode | undefined {
	function search(node: FSNode): FSNode | undefined {
		if (node.type === 'file' && node.src && node.name === name) return node;
		for (const child of node.children ?? []) {
			const found = search(child);
			if (found) return found;
		}
		return undefined;
	}
	return search(root);
}

export const root: FSNode = {
	name: '/',
	type: 'dir',
	children: [
		dir('home', [
			dir('dan', [
				file('about.txt', ['daniel mihovch', 'cs @ university of delaware'].join('\n')),
				doc('resume.pdf', '/Daniel_Mihovch_Resume.pdf'),
				doc('transcript.pdf', '/SSR_TSRPT.pdf'),
				dir('projects', [
					dir('portfolio-terminal', [
						file(
							'README.md',
							[
								'# portfolio-terminal',
								'',
								'the site you are looking at',
								'',
								'svelte, typescript'
							].join('\n')
						)
					])
				]),
				dir('research', [
					file('README.md', ['# research', '', 'papers and work in progress'].join('\n'))
				])
			])
		])
	]
};
