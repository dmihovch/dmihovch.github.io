export type Project = {
	repository: string;
	category: string;
	description: string;
	language: string;
	focus: string[];
};

export const projects: Project[] = [
	{
		repository: 'cimilar',
		category: 'Compiler construction',
		description:
			'A compiler written in Odin for a C-like language, working toward a compiler for a subset of C.',
		language: 'Odin',
		focus: ['C-like language', 'Odin', 'Work in progress']
	},
	{
		repository: 'automatar',
		category: 'Formal languages',
		description:
			'A finite state automata builder and executor in Rust. Define a deterministic machine in a .fsa file, then evaluate input strings against it.',
		language: 'Rust',
		focus: ['Finite state automata', 'File-based configuration']
	},
	{
		repository: 'raspberry-pie',
		category: 'Hardware emulation',
		description:
			'A Raspberry Pi Sense HAT emulator in C. Run the 8 × 8 LED matrix and joystick in a terminal, using the same function signatures as libsense.',
		language: 'C',
		focus: ['Sense HAT', 'Terminal graphics', 'POSIX']
	},
	{
		repository: 'rt-music-viz',
		category: 'Audio & signal processing',
		description:
			'A real-time music visualizer in C, using an FFT to turn captured desktop audio into discrete frequencies for visualization.',
		language: 'C',
		focus: ['FFT', 'PipeWire', 'raylib']
	}
];
