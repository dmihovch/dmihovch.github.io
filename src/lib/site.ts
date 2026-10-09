// Single source of truth for portfolio content. Edit this data to update
// both views: the terminal filesystem (content.ts) and the normal site
// pages read it.

export type Project = {
	name: string;
	description: string;
	githubUrl?: string;
};

export type SiteProfile = {
	name: string;
	tagline: string;
	githubUrl: string;
	resumePdfSrc: string;
	transcriptPdfSrc: string;
	projects: Project[];
	research: string;
};

export const profile: SiteProfile = {
	name: 'daniel mihovch',
	tagline: 'cs @ university of delaware',
	githubUrl: 'https://github.com/dmihovch',
	resumePdfSrc: '/Daniel_Mihovch_Resume.pdf',
	transcriptPdfSrc: '/SSR_TSRPT.pdf',
	projects: [
		{
			name: 'portfolio-terminal',
			description: 'the site you are looking at\n\nsvelte, typescript',
			githubUrl: 'https://github.com/dmihovch/dmihovch.github.io'
		}
	],
	research: 'papers and work in progress'
};
