<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	// The W stroke drawn as a single orange hairline, from the Residential Capabilities deck
	// (slides 3, 6 and 12). It draws itself once when its section scrolls into view.

	let { class: className = '' }: { class?: string } = $props();

	const draw: Attachment<SVGSVGElement> = (node) => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Server-rendered markup shows the finished line; it is only hidden once this runs.
		node.dataset.draw = 'pending';

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				node.dataset.draw = 'done';
				observer.disconnect();
			},
			{ rootMargin: '0px 0px -20% 0px' }
		);

		observer.observe(node);
		return () => observer.disconnect();
	};
</script>

<svg
	{@attach draw}
	class="w-line pointer-events-none absolute aspect-381/630 {className}"
	viewBox="-1 -1 383 632"
	aria-hidden="true"
>
	<path
		pathLength="1"
		d="M378 435C381 427 381 427 381 427C272 135 272 135 272 135C241 54 217 0 153 0C0 0 0 0 0 0C0 4 0 4 0 4C57 4 77 53 105 125C294 630 294 630 294 630C314 630 314 630 314 630L378 435Z"
	/>
</svg>

<style>
	.w-line path {
		fill: none;
		stroke: var(--color-orange);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
		stroke-dasharray: 1;
		stroke-dashoffset: 0;
		transition: stroke-dashoffset 2.4s var(--ease-cut);
	}

	.w-line:global([data-draw='pending']) path {
		stroke-dashoffset: 1;
	}
</style>
