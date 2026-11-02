import { error } from '@sveltejs/kit';
import { getProject, nextProject, projects } from '#lib/data/projects.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');

	return { project, next: nextProject(params.slug) };
};
