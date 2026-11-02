<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Image } from '#lib/data/projects.js';

	/** A slide with a slug links to that project. */
	type Slide = { image: Image; title: string; slug?: string };

	let { slides, interval = 6500 }: { slides: Slide[]; interval?: number } = $props();

	let current = $state(0);
	let previous = $state<number | null>(null);
	let playing = $state(true);
	let hovered = $state(false);
	let focused = $state(false);
	let reducedMotion = $state(false);

	// The progress bar is the timer: its animation ending moves to the next slide, so
	// pausing freezes the bar where it is and the two can never drift apart.
	const autoplay = $derived(playing && !reducedMotion && slides.length > 1);
	const paused = $derived(!autoplay || hovered || focused);
	const pad = (n: number) => String(n).padStart(2, '0');

	function go(index: number) {
		const next = (index + slides.length) % slides.length;
		if (next === current) return;
		previous = current;
		current = next;
	}

	$effect(() => {
		const query = matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = query.matches;
		const update = () => (reducedMotion = query.matches);
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	});

	// Pause for keyboard focus only. A mouse click also focuses the button it hits,
	// which would otherwise leave the slideshow paused after using next or previous.
	function onfocusin(event: FocusEvent) {
		focused = (event.target as Element).matches(':focus-visible');
	}

	function onfocusout(event: FocusEvent) {
		const next = event.relatedTarget as Node | null;
		if (!next || !(event.currentTarget as Node).contains(next)) focused = false;
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') go(current + 1);
		if (event.key === 'ArrowLeft') go(current - 1);
	}

	let startX: number | null = null;

	function onpointerdown(event: PointerEvent) {
		if (event.pointerType !== 'mouse') startX = event.clientX;
	}

	function onpointerup(event: PointerEvent) {
		if (startX === null) return;
		const dx = event.clientX - startX;
		startX = null;
		if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
	}
</script>

<!-- Keyboard focus pauses autoplay; arrow keys are a shortcut for the buttons inside. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	class="carousel relative h-svh min-h-140 overflow-hidden bg-navy text-pale"
	aria-roledescription="carousel"
	aria-label="Selected work"
	{onfocusin}
	{onfocusout}
	{onkeydown}
	{onpointerdown}
	{onpointerup}
>
	<div class="absolute inset-0" aria-live={paused ? 'polite' : 'off'}>
		{#each slides as slide, index (slide.image.src)}
			<div
				class="slide absolute inset-0"
				class:is-current={index === current}
				class:is-previous={index === previous}
				role="group"
				aria-roledescription="slide"
				aria-label="{index + 1} of {slides.length}: {slide.title}"
				aria-hidden={index !== current}
				inert={index !== current}
			>
				<img
					src={slide.image.src}
					alt={slide.image.alt}
					width={slide.image.width}
					height={slide.image.height}
					class="h-full w-full object-cover"
					loading={index === 0 ? 'eager' : 'lazy'}
					fetchpriority={index === 0 ? 'high' : 'auto'}
					decoding="async"
				/>
			</div>
		{/each}
	</div>

	<div class="shade pointer-events-none absolute inset-0"></div>

	<div class="pointer-events-none absolute inset-0 grid place-items-center">
		<h1 class="sr-only">EWM Bespoke Interiors</h1>
		<img
			src="/images/ewm/logo-orange-white.png"
			alt=""
			width="900"
			height="428"
			class="w-[min(58vw,300px)]"
		/>
	</div>

	<div class="wrap absolute inset-x-0 bottom-0 pb-8 md:pb-10">
		<div class="grid items-end gap-6 md:grid-cols-[1fr_auto]">
			<div class="min-w-0">
				{#key current}
					{@const slug = slides[current].slug}
					<p class="caption font-display text-2xl md:text-3xl">
						{#if slug}
							<a href={resolve('/projects/[slug]', { slug })} class="link-cut"
								>{slides[current].title}</a
							>
						{:else}
							{slides[current].title}
						{/if}
					</p>
				{/key}
			</div>

			<!-- Hovering the controls (not the whole hero, which fills the screen) pauses autoplay -->
			<div
				class="flex items-center gap-5 text-sm font-medium"
				role="group"
				aria-label="Slideshow controls"
				onmouseenter={() => (hovered = true)}
				onmouseleave={() => (hovered = false)}
			>
				<span class="tabular-nums" aria-hidden="true"
					>{pad(current + 1)} / {pad(slides.length)}</span
				>
				<button
					type="button"
					class="control"
					onclick={() => go(current - 1)}
					aria-label="Previous slide"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
				</button>
				<button
					type="button"
					class="control"
					onclick={() => go(current + 1)}
					aria-label="Next slide"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
				</button>
				<button
					type="button"
					class="control"
					onclick={() => (playing = !playing)}
					aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
				>
					{#if playing}
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>
					{:else}
						<svg viewBox="0 0 24 24" aria-hidden="true"
							><path d="M8 5.5v13l10.5-6.5z" class="fill" /></svg
						>
					{/if}
				</button>
			</div>
		</div>

		<div class="track mt-6" aria-hidden="true">
			{#key current}
				<span
					class="progress"
					class:is-auto={!reducedMotion && slides.length > 1}
					class:is-paused={paused}
					style:--duration="{interval}ms"
					onanimationend={() => go(current + 1)}
				></span>
			{/key}
		</div>
	</div>
</section>

<style>
	.slide {
		visibility: hidden;
	}

	.slide.is-previous {
		visibility: visible;
		z-index: 1;
	}

	.slide.is-current {
		visibility: visible;
		z-index: 2;
		animation: wipe-up 1.2s var(--ease-cut) both;
	}

	/* The incoming photo rises into place as its slide wipes up, then settles slowly. */
	.slide.is-current img {
		animation:
			rise 1.2s var(--ease-cut) both,
			settle 7.5s ease-out both;
	}

	/* The outgoing photo drifts up behind it, so the whole frame moves one way. */
	.slide.is-previous img {
		animation: lift 1.2s var(--ease-cut) both;
	}

	@keyframes wipe-up {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes rise {
		from {
			translate: 0 12%;
		}
	}

	@keyframes lift {
		to {
			translate: 0 -8%;
		}
	}

	@keyframes settle {
		from {
			scale: 1.05;
		}
		to {
			scale: 1;
		}
	}

	.shade {
		z-index: 3;
		background:
			linear-gradient(to bottom, rgb(25 28 34 / 0.55), transparent 22%),
			linear-gradient(to top, rgb(25 28 34 / 0.75), transparent 45%);
	}

	.carousel > :not(:first-child) {
		z-index: 4;
	}

	.caption {
		animation: caption-in 0.8s var(--ease-cut) 0.35s both;
	}

	@keyframes caption-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.control {
		cursor: pointer;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 1px solid var(--color-line-dark);
		border-radius: 999px;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	.control:hover {
		border-color: var(--color-pale);
	}

	.control:active {
		transform: scale(0.96);
	}

	.control svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
	}

	.control svg .fill {
		fill: currentColor;
		stroke: none;
	}

	.track {
		height: 1px;
		background: var(--color-line-dark);
		overflow: hidden;
	}

	.progress {
		display: block;
		height: 100%;
		background: var(--color-orange);
		transform: scaleX(0);
		transform-origin: left;
	}

	.progress.is-auto {
		animation: progress var(--duration) linear both;
	}

	.progress.is-paused {
		animation-play-state: paused;
	}

	@keyframes progress {
		to {
			transform: scaleX(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.slide.is-current,
		.slide.is-current img,
		.slide.is-previous img,
		.caption {
			animation: none;
		}
	}
</style>
