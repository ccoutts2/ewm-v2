<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	// The vertical edge labels from the brand decks, as fixed rails on wide screens:
	// the company on the left, the section in view on the right, like a drawing sheet margin.
	// Sections opt in with a data-rail attribute naming themselves.

	let { fallback = '' }: { fallback?: string } = $props();

	let current = $state('');

	function watch() {
		const sections = [...document.querySelectorAll<HTMLElement>('[data-rail]')];
		if (!sections.length) {
			current = fallback;
			return;
		}

		// A thin band across the middle of the screen decides which section is "in view".
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) current = (entry.target as HTMLElement).dataset.rail ?? '';
				}
			},
			{ rootMargin: '-50% 0px -50% 0px' }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}

	let stop: (() => void) | undefined;

	afterNavigate(() => {
		stop?.();
		current = fallback;
		stop = watch();
	});

	$effect(() => () => stop?.());
</script>

<div class="rails" aria-hidden="true">
	<span class="rail left">EWM Bespoke Interiors</span>
	{#key current}
		<span class="rail right">{current}</span>
	{/key}
</div>

<style>
	.rails {
		display: none;
	}

	@media (min-width: 1280px) {
		.rails {
			display: contents;
		}
	}

	.rail {
		position: fixed;
		top: 50%;
		z-index: 40;
		pointer-events: none;
		font-size: 0.625rem;
		font-weight: 500;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		white-space: nowrap;
		writing-mode: vertical-rl;
		/* Pale text that inverts to dark over light sections, so one rail reads on both grounds */
		color: var(--color-pale);
		mix-blend-mode: difference;
	}

	.left {
		left: 18px;
		transform: translateY(-50%) rotate(180deg);
	}

	.right {
		right: 18px;
		transform: translateY(-50%);
		animation: rail-in 0.6s var(--ease-cut) both;
	}

	@keyframes rail-in {
		from {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.right {
			animation: none;
		}
	}
</style>
