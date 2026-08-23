// Pure filesystem model + path helpers. No state, no side effects.

export type FSNodeType = 'dir' | 'file';

export type FSNode = {
	name: string;
	type: FSNodeType;
	children?: FSNode[];
	content?: string;
	src?: string;
};

// Absolute path (as segments) of the user's home directory.
export const HOME_SEGMENTS = ['home', 'dan'];

// Split a raw path string into segments, dropping empty and '.'
// entries. Absolute paths ('/a/b') and relative ones collapse to the
// same segment list; leading '/' is handled by the caller.
export function parsePath(input: string): string[] {
	return input.split('/').filter((segment) => segment !== '' && segment !== '.');
}

// Resolve a relative segment list against a current working directory.
// Returns null if the path would escape the root.
export function buildAbsolute(cwd: string[], rel: string[]): string[] | null {
	const stack = [...cwd];
	for (const segment of rel) {
		if (segment === '..') {
			if (stack.length === 0) return null;
			stack.pop();
		} else {
			stack.push(segment);
		}
	}
	return stack;
}

// Walk the tree from the root node following an absolute segment list.
export function walk(root: FSNode, segments: string[]): FSNode | null {
	let node = root;
	for (const segment of segments) {
		const next = node.children?.find((child) => child.name === segment);
		if (!next) return null;
		node = next;
	}
	return node;
}

// Render an absolute segment list as a prompt-style path, collapsing the
// home directory to '~'.
export function displayPath(segments: string[]): string {
	if (
		segments.length >= HOME_SEGMENTS.length &&
		HOME_SEGMENTS.every((segment, i) => segments[i] === segment)
	) {
		const rest = segments.slice(HOME_SEGMENTS.length);
		return rest.length === 0 ? '~' : '~/' + rest.join('/');
	}
	return '/' + segments.join('/');
}
