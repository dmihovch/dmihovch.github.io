// Single source of truth for the profile identity. Section content lives in
// sections.ts.

export type SiteProfile = {
	name: string;
	githubUrl: string;
	linkedinUrl: string;
	youtubeUrl: string;
	resumePdfSrc: string;
	transcriptPdfSrc: string;
};

export const profile: SiteProfile = {
	name: 'Daniel Mihovch',
	githubUrl: 'https://github.com/dmihovch',
	linkedinUrl: 'https://www.linkedin.com/in/danielmihovch',
	youtubeUrl: 'https://www.youtube.com/channel/UCCWsAt7zztAKf4Sm_1HX1Nw',
	resumePdfSrc: '/Daniel_Mihovch_Resume.pdf',
	transcriptPdfSrc: '/SSR_TSRPT.pdf'
};
