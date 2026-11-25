export type TeachingResource = {
	slug: string;
	title: string;
	summary: string;
	githubUrl: string;
};

export const teachingResources: TeachingResource[] = [
	{
		slug: 'cisc210-lectures',
		title: 'CISC 210 Friday Lectures',
		summary:
			'Lecture examples and notes for CISC 210 (Introduction to Systems Programming) at the University of Delaware, covering Bash, C, debugging, pointers, and linked lists.',
		githubUrl: 'https://github.com/dmihovch/cisc210-lectures'
	}
];
