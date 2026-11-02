import type { Attachment } from 'svelte/attachments';

/**
 * Wipes an element up into place when it scrolls into view (styles in layout.css).
 * Server-rendered markup stays fully visible; the hidden state is only applied once
 * this runs in the browser, and never when the visitor prefers reduced motion.
 */
export const reveal: Attachment<HTMLElement> = (node) => {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.dataset.reveal = 'pending';

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.dataset.reveal = 'done';
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -12% 0px' }
	);

	observer.observe(node);

	return () => observer.disconnect();
};
