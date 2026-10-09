import { error } from '@sveltejs/kit';
import { teachingResources } from '$lib/teaching';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	teachingResources.map((resource) => ({ slug: resource.slug }));

export const load: PageLoad = ({ params }) => {
	const resource = teachingResources.find((candidate) => candidate.slug === params.slug);
	if (!resource) {
		error(404, `teaching resource not found: ${params.slug}`);
	}
	return { resource };
};
