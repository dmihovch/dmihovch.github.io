import { posts } from '$lib/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ posts });
