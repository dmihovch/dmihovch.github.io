// The terminal filesystem, generated from the shared profile data in site.ts.

import type { FSNode } from './filesystem';
import { profile } from './site';

const dir = (name: string, children: FSNode[] = []): FSNode => ({ name, type: 'dir', children });
const file = (name: string, content: string): FSNode => ({ name, type: 'file', content });
const doc = (name: string, src: string): FSNode => ({ name, type: 'file', src });

const projectReadme = (projectName: string, description: string, githubUrl?: string): string =>
	['# ' + projectName, '', description, ...(githubUrl ? ['', githubUrl] : [])].join('\n');

export const root: FSNode = {
	name: '/',
	type: 'dir',
	children: [
		dir('home', [
			dir('dan', [
				file('about.txt', [profile.name, profile.tagline].join('\n')),
				doc('resume.pdf', profile.resumePdfSrc),
				doc('transcript.pdf', profile.transcriptPdfSrc),
				dir(
					'projects',
					profile.projects.map((project) =>
						dir(project.name, [
							file('README.md', projectReadme(project.name, project.description, project.githubUrl))
						])
					)
				),
				dir('research', [file('README.md', ['# research', '', profile.research].join('\n'))])
			])
		])
	]
};
