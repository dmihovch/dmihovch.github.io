import { dev } from '$app/environment';

export type BlogPost = {
	slug: string;
	title: string;
	date: string;
	description: string;
	draft: boolean;
};

const metadata = import.meta.glob<unknown>('/src/content/blog/*.md', {
	eager: true,
	import: 'metadata'
});

function readPost(path: string, metadata: unknown): BlogPost {
	const slug = path.slice('/src/content/blog/'.length, -'.md'.length);
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new Error(`${path}: use a lowercase, hyphen-separated filename.`);
	}
	if (
		typeof metadata !== 'object' ||
		metadata === null ||
		!('title' in metadata) ||
		typeof metadata.title !== 'string' ||
		!metadata.title.trim() ||
		!('date' in metadata) ||
		typeof metadata.date !== 'string' ||
		!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ||
		!('description' in metadata) ||
		typeof metadata.description !== 'string' ||
		!metadata.description.trim() ||
		('draft' in metadata && typeof metadata.draft !== 'boolean')
	) {
		throw new Error(
			`${path}: provide a title, a quoted YYYY-MM-DD date, and a description. Draft must be a boolean if set.`
		);
	}
	const timestamp = Date.parse(`${metadata.date}T00:00:00Z`);
	if (
		!Number.isFinite(timestamp) ||
		new Date(timestamp).toISOString().slice(0, 10) !== metadata.date
	) {
		throw new Error(`${path}: date must be a valid calendar date.`);
	}
	return {
		slug,
		title: metadata.title,
		date: metadata.date,
		description: metadata.description,
		draft: 'draft' in metadata && metadata.draft === true
	};
}

export const posts: BlogPost[] = Object.entries(metadata)
	.map(([path, metadata]: [string, unknown]): BlogPost => readPost(path, metadata))
	.filter((post: BlogPost): boolean => dev || !post.draft)
	.sort(
		(first: BlogPost, second: BlogPost): number =>
			second.date.localeCompare(first.date) || first.slug.localeCompare(second.slug)
	);

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	day: 'numeric',
	year: 'numeric',
	timeZone: 'UTC'
});

export function formatPostDate(date: string): string {
	return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}
