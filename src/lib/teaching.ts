// Teaching resources shown on the normal site. These pages are not part of
// the terminal filesystem; add new entries here to create new sub-routes
// under /teaching/<slug>.

export type TeachingResource = {
	slug: string;
	title: string;
	summary: string;
	content: string;
	githubUrl: string;
};

export const teachingResources: TeachingResource[] = [
	{
		slug: 'cisc210-lectures',
		title: 'CISC210 Friday Lectures',
		summary:
			'Friday lectures and review sessions for CISC210 (Introduction to Systems Programming) at UD, with a practice problem set for every week.',
		githubUrl: 'https://github.com/dmihovch/cisc210-lectures',
		content: [
			'Friday lectures, review sessions, and practice problem sets for CISC210 (Introduction to Systems Programming) at the University of Delaware.',
			'',
			'Each week has its own folder with the examples and the problem set from that session. All materials live in one repository: [cisc210-lectures](https://github.com/dmihovch/cisc210-lectures).',
			'',
			'## Topics',
			'',
			'- intro to bash',
			'- binary, make, and C',
			'- debugging with gdb',
			'- more bash and basic C',
			'- scanf is weird',
			'',
			'## Using it',
			'',
			'- clone the repository: `git clone https://github.com/dmihovch/cisc210-lectures`',
			'- open the folder for the week you want',
			'- report problems in the repository issues'
		].join('\n')
	},
	{
		slug: 'sense-hat',
		title: 'Raspberry Pi Sense HAT Emulator',
		summary:
			"A C library that emulates the Raspberry Pi Sense HAT in your terminal. It's drop-in compatible with the Libsense library we use at UD.",
		githubUrl: 'https://github.com/dmihovch/raspberry-pie',
		content: [
			'Raspberry PiE is a C library that emulates the Sense HAT of a Raspberry Pi in the terminal. Its function signatures match the Libsense library used in CISC210 at UD. One program links against either library: compile against Raspberry PiE to develop without hardware, then against Libsense to run on the Raspberry Pi.',
			'',
			'- drop-in: `#include "sense.h"` becomes `#include "piemulator.h"`, and `-lsense` becomes `-lpie`',
			'- the arrow keys act as the joystick, and enter/return acts as the joystick button',
			'- written in C and POSIX compliant. No Windows build; ports welcome',
			'',
			'## Trying it',
			'',
			'- clone [raspberry-pie](https://github.com/dmihovch/raspberry-pie) and run the build script',
			'- compile a Sense HAT program against the library: `gcc -o example example.c -lpie`',
			'- run it, and the LED matrix renders in your terminal',
			'',
			'## Status',
			'',
			'The library is a work in progress for quick testing and on-the-go development. A pixel write outside the LED matrix bounds draws nothing instead of segfaulting as it does on the real hardware. Run a final test on the Raspberry Pi before relying on the result.'
		].join('\n')
	}
];
