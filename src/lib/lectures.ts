import snapshot from './lecture-snapshot.json' with { type: 'json' };

export type LectureMaterial = {
	path: string;
	name: string;
	kind: 'tree' | 'blob';
};

export type LectureTopic = {
	path: string;
	title: string;
	description: string;
	materials: LectureMaterial[];
};

export type LectureCollection = {
	branch: string;
	topics: LectureTopic[];
	playground: string | null;
};

type TreeEntry = { path: string; type: 'tree' | 'blob' | 'commit' };

type TopicDescription = { path: string; title: string; description: string };

export const lectureRepositoryUrl = 'https://github.com/dmihovch/cisc210-lectures';
const apiUrl = 'https://api.github.com/repos/dmihovch/cisc210-lectures';
const cacheKey = 'teaching:cisc210:v1';
const cacheLifetime = 30 * 60 * 1000;
const requestTimeout = 8000;
const headers = { Accept: 'application/vnd.github+json' };

const topicDescriptions: TopicDescription[] = [
	{
		path: 'bash-intro',
		title: 'Introduction to Bash',
		description:
			'Shell commands, redirection, pipelines, filename expansion, and reading process information with top.'
	},
	{
		path: 'binary-make-c',
		title: 'Binary, Make & C',
		description:
			'Unsigned integers, ASCII, binary and hexadecimal representations, Makefiles, and shell pipelines.'
	},
	{
		path: 'more-bash-and-basic-c',
		title: 'More Bash & Basic C',
		description:
			'Processes and exit codes, compilation, formatted output with printf, input with scanf, and a Vim exercise.'
	},
	{
		path: 'scanf-is-weird',
		title: 'scanf & Input',
		description:
			'Small examples of character input, newline consumption, and conversions between characters and ASCII values.'
	},
	{
		path: 'gdb',
		title: 'Debugging with GDB',
		description:
			'A command reference and seven demos covering stepping, call stacks, pointers, arrays, swapping, off-by-one errors, and segmentation faults.'
	},
	{
		path: 'ptr-arith-structs',
		title: 'Pointer Arithmetic & Structs',
		description:
			'Pointer arithmetic, arrays of structs, arrays of pointers, member access, and the difference between element and byte offsets.'
	},
	{
		path: 'link-list',
		title: 'Linked Lists',
		description:
			'The in-class example and a complete implementation with recursive node insertion, traversal, allocation, and cleanup.'
	}
];

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPath(value: unknown): value is string {
	return (
		typeof value === 'string' &&
		value.length > 0 &&
		!/[\\\u0000-\u001f\u007f]/.test(value) &&
		value.split('/').every((part: string): boolean => part !== '' && part !== '.' && part !== '..')
	);
}

function parseEntries(value: unknown): TreeEntry[] | null {
	if (!Array.isArray(value)) return null;
	const entries: TreeEntry[] = [];
	const paths = new Set<string>();
	for (const entry of value) {
		if (
			!isRecord(entry) ||
			!isPath(entry.path) ||
			(entry.type !== 'tree' && entry.type !== 'blob' && entry.type !== 'commit') ||
			paths.has(entry.path)
		)
			return null;
		paths.add(entry.path);
		entries.push({ path: entry.path, type: entry.type });
	}
	return entries;
}

function topicTitle(path: string): string {
	return path
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (letter: string): string => letter.toUpperCase());
}

function buildCollection(branch: string, entries: TreeEntry[]): LectureCollection {
	const topics = entries
		.filter(
			(entry: TreeEntry): boolean =>
				entry.type === 'tree' &&
				!entry.path.includes('/') &&
				!entry.path.startsWith('.') &&
				entry.path !== 'PLAYGROUND'
		)
		.map((entry: TreeEntry): LectureTopic => {
			const description = topicDescriptions.find(
				(topic: TopicDescription): boolean => topic.path === entry.path
			);
			const prefix = `${entry.path}/`;
			const materials = entries
				.filter(
					(child: TreeEntry): boolean =>
						child.path.startsWith(prefix) &&
						!child.path.slice(prefix.length).includes('/') &&
						(child.type === 'tree' ||
							(child.type === 'blob' &&
								(/\.(c|h|sh|md|txt|py|pdf)$/i.test(child.path) ||
									/\/makefile(?:\..*)?$/i.test(child.path))))
				)
				.map(
					(child: TreeEntry): LectureMaterial => ({
						path: child.path,
						name: child.path.slice(prefix.length),
						kind: child.type === 'tree' ? 'tree' : 'blob'
					})
				)
				.sort(
					(left: LectureMaterial, right: LectureMaterial): number =>
						Number(right.kind === 'tree') - Number(left.kind === 'tree') ||
						left.name.localeCompare(right.name, 'en', { numeric: true })
				);
			return {
				path: entry.path,
				title: description?.title ?? topicTitle(entry.path),
				description: description?.description ?? 'Examples and notes in this lecture folder.',
				materials
			};
		})
		.sort((left: LectureTopic, right: LectureTopic): number => {
			const leftOrder = topicDescriptions.findIndex(
				(topic: TopicDescription): boolean => topic.path === left.path
			);
			const rightOrder = topicDescriptions.findIndex(
				(topic: TopicDescription): boolean => topic.path === right.path
			);
			return (
				(leftOrder < 0 ? topicDescriptions.length : leftOrder) -
					(rightOrder < 0 ? topicDescriptions.length : rightOrder) ||
				left.title.localeCompare(right.title)
			);
		});
	return {
		branch,
		topics,
		playground: entries.some(
			(entry: TreeEntry): boolean => entry.type === 'blob' && entry.path === 'PLAYGROUND/Makefile'
		)
			? 'PLAYGROUND/Makefile'
			: null
	};
}

const snapshotEntries = parseEntries(snapshot.tree);
if (!snapshotEntries) throw new Error('Invalid lecture topic snapshot');
export const lectureSnapshot: LectureCollection = buildCollection(snapshot.branch, snapshotEntries);

export function lectureMaterialUrl(branch: string, path: string, kind: 'tree' | 'blob'): string {
	return `${lectureRepositoryUrl}/${kind}/${encodeURIComponent(branch)}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

function readCache(): LectureCollection | null {
	try {
		const cached: unknown = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null');
		if (
			!isRecord(cached) ||
			typeof cached.savedAt !== 'number' ||
			!Number.isFinite(cached.savedAt) ||
			cached.savedAt > Date.now() ||
			Date.now() - cached.savedAt >= cacheLifetime ||
			typeof cached.branch !== 'string' ||
			cached.branch.length === 0
		)
			return null;
		const entries = parseEntries(cached.tree);
		return entries ? buildCollection(cached.branch, entries) : null;
	} catch {
		return null;
	}
}

export async function loadLectureTopics(
	fetcher: typeof fetch,
	signal: AbortSignal
): Promise<LectureCollection | null> {
	const cached = readCache();
	if (cached) return cached;
	const requestSignal = AbortSignal.any([signal, AbortSignal.timeout(requestTimeout)]);
	try {
		const repositoryResponse = await fetcher(apiUrl, { headers, signal: requestSignal });
		if (!repositoryResponse.ok) return null;
		const repository: unknown = await repositoryResponse.json();
		if (
			!isRecord(repository) ||
			typeof repository.default_branch !== 'string' ||
			!repository.default_branch
		)
			return null;
		const branch = repository.default_branch;
		const treeResponse = await fetcher(
			`${apiUrl}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
			{ headers, signal: requestSignal }
		);
		if (!treeResponse.ok) return null;
		const result: unknown = await treeResponse.json();
		if (!isRecord(result) || result.truncated !== false) return null;
		const entries = parseEntries(result.tree);
		if (!entries || signal.aborted) return null;
		const collection = buildCollection(branch, entries);
		try {
			sessionStorage.setItem(
				cacheKey,
				JSON.stringify({ savedAt: Date.now(), branch, tree: entries })
			);
		} catch {
			// Topic links remain usable when browser storage is disabled.
		}
		return collection;
	} catch {
		return null;
	}
}
