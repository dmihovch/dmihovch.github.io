import { error } from '@sveltejs/kit';
import { findSection, sections } from '$lib/sections';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	sections.filter((section) => !section.custom).map((section) => ({ section: section.slug }));

export const load: PageLoad = ({ params }) => {
	const section = findSection(params.section);
	if (!section || section.custom) {
		error(404, `unknown section: ${params.section}`);
	}
	return { section };
};
