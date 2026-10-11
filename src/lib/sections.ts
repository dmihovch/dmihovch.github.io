// Site sections. Each entry produces a nav link, a home-page preview, and a
// stub page at /<slug>. A section with custom: true has its own page under
// src/routes/<slug>/ and is skipped by the generic stub route.

export type SectionSlug = 'research' | 'teaching' | 'projects' | 'course-work' | 'blog' | 'about';

export type SiteSection = {
	slug: SectionSlug;
	title: string;
	blurb: string;
	custom?: boolean;
};

export const sections: SiteSection[] = [
	{
		slug: 'research',
		title: 'Research',
		blurb: 'Papers and work in progress.'
	},
	{
		slug: 'teaching',
		title: 'Teaching',
		blurb:
			'Lecture materials, review sessions, and practice problems I write as a teaching assistant.',
		custom: true
	},
	{
		slug: 'projects',
		title: 'Projects',
		blurb: 'Things I build and maintain.'
	},
	{
		slug: 'course-work',
		title: 'Coursework',
		blurb: 'Classes and coursework.'
	},
	{
		slug: 'blog',
		title: 'Blog',
		blurb: 'Notes and longer posts.'
	},
	{
		slug: 'about',
		title: 'About Me',
		blurb: 'A bit about who I am.'
	}
];

export function findSection(slug: string): SiteSection | undefined {
	return sections.find((section) => section.slug === slug);
}
