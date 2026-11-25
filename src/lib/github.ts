import { projects, type Project } from './projects';

export type RepositoryLanguage = {
	name: string;
	percentage: number;
};

export type RepositoryDetails = {
	stars: number;
	forks: number;
	pushedAt: string | null;
	branch: string;
	languages: RepositoryLanguage[];
};

export type Repositories = Partial<Record<string, RepositoryDetails>>;

const cacheKey = 'projects:github:v1';
const cacheLifetime = 30 * 60 * 1000;
const requestTimeout = 8000;
const headers = { Accept: 'application/vnd.github+json' };

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCount(value: unknown): value is number {
	return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isRepositoryDetails(value: unknown): value is RepositoryDetails {
	return (
		isRecord(value) &&
		isCount(value.stars) &&
		isCount(value.forks) &&
		(value.pushedAt === null ||
			(typeof value.pushedAt === 'string' && Number.isFinite(Date.parse(value.pushedAt)))) &&
		typeof value.branch === 'string' &&
		value.branch.length > 0 &&
		Array.isArray(value.languages) &&
		value.languages.every(
			(language: unknown): boolean =>
				isRecord(language) &&
				typeof language.name === 'string' &&
				typeof language.percentage === 'number' &&
				Number.isFinite(language.percentage) &&
				language.percentage > 0 &&
				language.percentage <= 100
		)
	);
}

function readCache(): Repositories | null {
	try {
		const cached: unknown = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null');
		if (
			isRecord(cached) &&
			typeof cached.savedAt === 'number' &&
			cached.savedAt <= Date.now() &&
			Date.now() - cached.savedAt < cacheLifetime &&
			isRecord(cached.repositories)
		) {
			const repositories: Repositories = {};
			for (const project of projects) {
				const details = cached.repositories[project.repository];
				if (!isRepositoryDetails(details)) return null;
				repositories[project.repository] = details;
			}
			return repositories;
		}
	} catch {
		// Storage can be disabled by browser privacy settings.
	}
	return null;
}

async function fetchRepository(
	repository: string,
	fetcher: typeof fetch,
	signal: AbortSignal
): Promise<RepositoryDetails | null> {
	const endpoint = `https://api.github.com/repos/dmihovch/${repository}`;
	try {
		const response = await fetcher(endpoint, { headers, signal });
		if (!response.ok) return null;
		const result: unknown = await response.json();
		if (
			!isRecord(result) ||
			!isCount(result.stargazers_count) ||
			!isCount(result.forks_count) ||
			typeof result.default_branch !== 'string' ||
			result.default_branch.length === 0
		) {
			return null;
		}

		let languages: RepositoryLanguage[] = [];
		try {
			const response = await fetcher(`${endpoint}/languages`, { headers, signal });
			const result: unknown = response.ok ? await response.json() : null;
			if (isRecord(result)) {
				const entries = Object.entries(result).filter(
					(entry: [string, unknown]): entry is [string, number] => isCount(entry[1]) && entry[1] > 0
				);
				const total = entries.reduce(
					(sum: number, entry: [string, number]): number => sum + entry[1],
					0
				);
				languages = entries
					.sort((left: [string, number], right: [string, number]): number => right[1] - left[1])
					.map(
						([name, bytes]: [string, number]): RepositoryLanguage => ({
							name,
							percentage: (bytes / total) * 100
						})
					);
			}
		} catch {
			// Repository metadata remains usable when the language endpoint fails.
		}

		return {
			stars: result.stargazers_count,
			forks: result.forks_count,
			branch: result.default_branch,
			pushedAt:
				typeof result.pushed_at === 'string' && Number.isFinite(Date.parse(result.pushed_at))
					? result.pushed_at
					: null,
			languages
		};
	} catch {
		return null;
	}
}

export async function loadRepositories(
	fetcher: typeof fetch,
	signal: AbortSignal
): Promise<Repositories> {
	const cached = readCache();
	if (cached) return cached;

	const requestSignal = AbortSignal.any([signal, AbortSignal.timeout(requestTimeout)]);
	const results = await Promise.all(
		projects.map(
			async (project: Project): Promise<[string, RepositoryDetails | null]> => [
				project.repository,
				await fetchRepository(project.repository, fetcher, requestSignal)
			]
		)
	);
	const repositories: Repositories = {};
	for (const [repository, details] of results) {
		if (details) repositories[repository] = details;
	}

	if (
		!signal.aborted &&
		results.every((entry: [string, RepositoryDetails | null]): boolean => entry[1] !== null)
	) {
		try {
			sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), repositories }));
		} catch {
			// Repository details do not require browser storage.
		}
	}
	return repositories;
}
