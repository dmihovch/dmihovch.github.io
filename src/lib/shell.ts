import {
	buildAbsolute,
	displayPath,
	HOME_SEGMENTS,
	parsePath,
	walk,
	type FSNode
} from './filesystem';

export type Tone = 'plain' | 'dir' | 'file' | 'error';

export type Line = {
	text: string;
	tone?: Tone;
};

export type CommandResult = {
	lines: Line[];
	cwd?: string[];
	clear?: boolean;
	open?: Viewer;
};

export type Viewer =
	| { kind: 'pdf'; src: string }
	| { kind: 'markdown'; name: string; content: string };

type Ctx = {
	root: FSNode;
	cwd: string[];
};

type TargetResult = { ok: true; segments: string[] } | { ok: false; error: string };

const err = (text: string): CommandResult => ({ lines: [{ text, tone: 'error' }] });

function resolveTarget(ctx: Ctx, raw: string): TargetResult {
	if (!raw) return { ok: true, segments: ctx.cwd };

	if (raw === '~' || raw.startsWith('~/')) {
		const segments = [...HOME_SEGMENTS];
		if (raw.startsWith('~/')) segments.push(...parsePath(raw.slice(2)));
		return { ok: true, segments };
	}

	if (raw.startsWith('/')) {
		return { ok: true, segments: parsePath(raw) };
	}

	const segments = buildAbsolute(ctx.cwd, parsePath(raw));
	if (!segments) return { ok: false, error: 'cd: cannot go above root' };
	return { ok: true, segments };
}

function listLines(node: FSNode): Line[] {
	const children = [...(node.children ?? [])].sort((a, b) => a.name.localeCompare(b.name));
	return children.map((child) => ({
		text: child.name + (child.type === 'dir' ? '/' : ''),
		tone: child.type === 'dir' ? 'dir' : 'file'
	}));
}

function readFileLines(ctx: Ctx, raw: string): CommandResult {
	const target = resolveTarget(ctx, raw);
	if (!target.ok) return err(target.error);
	const node = walk(ctx.root, target.segments);
	if (!node) return err(`cat: ${raw}: no such file or directory`);
	if (node.type === 'dir') return err(`cat: ${raw}: is a directory`);
	const content = node.content ?? '';
	if (content === '') return { lines: [] };
	return { lines: content.split('\n').map((text) => ({ text })) };
}

function cmd_ls(ctx: Ctx, args: string[]): CommandResult {
	const raw = args[0];
	if (raw) {
		const target = resolveTarget(ctx, raw);
		if (!target.ok) return err(`ls: ${target.error}`);
		const node = walk(ctx.root, target.segments);
		if (!node) return err(`ls: ${raw}: no such file or directory`);
		if (node.type === 'file') return { lines: [{ text: node.name, tone: 'file' }] };
		return { lines: listLines(node) };
	}
	const node = walk(ctx.root, ctx.cwd);
	if (!node) return err('ls: cannot list current directory');
	return { lines: listLines(node) };
}

function cmd_cd(ctx: Ctx, args: string[]): CommandResult {
	const raw = args[0] ?? '~';
	const target = resolveTarget(ctx, raw);
	if (!target.ok) return err(target.error);
	const node = walk(ctx.root, target.segments);
	if (!node) return err(`cd: ${raw}: no such file or directory`);
	if (node.type !== 'dir') return err(`cd: ${raw}: not a directory`);
	return { lines: [], cwd: target.segments };
}

function cmd_cat(ctx: Ctx, args: string[]): CommandResult {
	if (args.length === 0) return err('cat: missing operand');
	return readFileLines(ctx, args[0]);
}

function cmd_pwd(ctx: Ctx): CommandResult {
	return { lines: [{ text: displayPath(ctx.cwd) }] };
}

function cmd_echo(args: string[]): CommandResult {
	return { lines: [{ text: args.join(' ') }] };
}

function cmd_whoami(): CommandResult {
	return { lines: [{ text: 'dan' }] };
}

function cmd_clear(): CommandResult {
	return { lines: [], clear: true };
}

function cmd_open(ctx: Ctx, args: string[]): CommandResult {
	if (args.length === 0) return err('open: missing operand');
	const raw = args[0];
	const target = resolveTarget(ctx, raw);
	if (!target.ok) return err(target.error);
	const node = walk(ctx.root, target.segments);
	if (!node) return err(`open: ${raw}: no such file or directory`);
	if (node.type === 'dir') return err(`open: ${raw}: is a directory`);
	if (node.src) return { lines: [], open: { kind: 'pdf', src: node.src } };
	if (node.name.endsWith('.md') || node.name.endsWith('.markdown')) {
		return { lines: [], open: { kind: 'markdown', name: node.name, content: node.content ?? '' } };
	}
	return err(`open: ${raw}: cannot be viewed`);
}

const HELP_LINES: string[] = [
	'ls [dir]',
	'cd <dir>',
	'cat <file>',
	'open <file>',
	'pwd',
	'whoami',
	'echo <text>',
	'clear',
	'help'
];

export const COMMAND_NAMES = [
	'ls',
	'cd',
	'cat',
	'open',
	'pwd',
	'whoami',
	'echo',
	'clear',
	'help'
];

export function run(tokens: string[], ctx: Ctx): CommandResult {
	if (tokens.length === 0) return { lines: [] };
	const command = tokens[0];
	const args = tokens.slice(1);

	switch (command) {
		case 'ls':
			return cmd_ls(ctx, args);
		case 'cd':
			return cmd_cd(ctx, args);
		case 'cat':
			return cmd_cat(ctx, args);
		case 'open':
			return cmd_open(ctx, args);
		case 'pwd':
			return cmd_pwd(ctx);
		case 'whoami':
			return cmd_whoami();
		case 'echo':
			return cmd_echo(args);
		case 'clear':
			return cmd_clear();
		case 'help':
			return { lines: HELP_LINES.map((text) => ({ text, tone: 'dir' as Tone })) };
		default:
			return err(`command not found: ${command}`);
	}
}

export function parseShell(raw: string): string[] {
	return raw
		.trim()
		.split(/\s+/)
		.filter((token) => token.length > 0);
}
