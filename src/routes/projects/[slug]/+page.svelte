<script lang="ts">
	import { resolve } from '$app/paths';
	import SpecSheet from '#lib/components/SpecSheet.svelte';
	import { reveal } from '#lib/reveal.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);
	const next = $derived(data.next);

	// Shared between the pins on photographs and the rows of the specification sheet.
	let active = $state<string | null>(null);

	const specFor = (key: string) => project.spec.find((row) => row.key === key);
</script>

<svelte:head>
	<title>{project.title} | EWM Bespoke Interiors</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<header class="relative h-[78svh] min-h-[480px] overflow-hidden bg-navy text-pale md:h-[86svh]">
	<img
		src={project.detailHero.src}
		alt={project.detailHero.alt}
		width={project.detailHero.width}
		height={project.detailHero.height}
		fetchpriority="high"
		class="hero-image absolute inset-0 h-full w-full object-cover"
	/>
	<div class="shade absolute inset-0"></div>
	<div class="wrap absolute inset-x-0 bottom-0 grid gap-4 pb-10 md:pb-14">
		<a
			href={resolve('/#projects')}
			class="link-cut justify-self-start text-sm font-medium text-orange">All projects</a
		>
		<h1 class="max-w-[16ch] text-5xl md:text-7xl">{project.title}</h1>
		<p class="text-on-navy-muted">{project.location}, {project.year}</p>
	</div>
</header>

<div class="wrap grid gap-16 py-20 md:grid-cols-12 md:gap-x-6 md:py-28">
	<div class="grid content-start gap-6 md:col-span-7">
		<p class="font-display text-2xl leading-snug md:text-3xl">{project.summary}</p>
		{#each project.body as paragraph (paragraph)}
			<p class="max-w-[62ch] text-muted">{paragraph}</p>
		{/each}
	</div>

	<div class="md:col-span-4 md:col-start-9 md:row-span-2">
		<div class="md:sticky md:top-28">
			<SpecSheet rows={project.spec} scope={project.scope} bind:active />
			<a
				href={resolve('/#contact')}
				class="mt-8 inline-block bg-navy px-6 py-3.5 text-sm font-semibold text-pale transition-transform active:scale-[0.98]"
				>Discuss a similar project</a
			>
		</div>
	</div>

	<div class="grid gap-16 md:col-span-7 md:gap-24">
		{#if project.gallery.length === 0}
			<img
				{@attach reveal}
				src={project.cover.src}
				alt={project.cover.alt}
				width={project.cover.width}
				height={project.cover.height}
				loading="lazy"
				decoding="async"
				class="aspect-4/5 w-full object-cover md:w-3/4"
			/>
		{/if}

		{#each project.gallery as item, index (index)}
			{#if item.kind === 'wide'}
				<figure class="grid gap-3">
					<div class="relative" {@attach reveal}>
						<img
							src={item.image.src}
							alt={item.image.alt}
							width={item.image.width}
							height={item.image.height}
							loading="lazy"
							decoding="async"
							class="w-full"
						/>
						{#each item.pins ?? [] as pin (pin.key)}
							{@const row = specFor(pin.key)}
							<button
								type="button"
								class="pin"
								class:is-active={active === pin.key}
								style:left="{pin.x}%"
								style:top="{pin.y}%"
								aria-label="{pin.key}: {row?.label}, {row?.value}"
								aria-pressed={active === pin.key}
								onmouseenter={() => (active = pin.key)}
								onmouseleave={() => (active = null)}
								onfocus={() => (active = pin.key)}
								onblur={() => (active = null)}
								onclick={() => (active = active === pin.key ? null : pin.key)}>{pin.key}</button
							>
						{/each}
					</div>
					<figcaption class="text-sm text-muted">{item.caption}</figcaption>
				</figure>
			{:else if item.kind === 'pair'}
				<div class="grid gap-6 sm:grid-cols-2">
					{#each item.images as image, i (image.src)}
						<figure class="grid content-start gap-3 {i === 1 ? 'sm:mt-24' : ''}">
							<img
								{@attach reveal}
								src={image.src}
								alt={image.alt}
								width={image.width}
								height={image.height}
								loading="lazy"
								decoding="async"
								class="aspect-4/5 w-full object-cover"
							/>
							<figcaption class="text-sm text-muted">{item.captions[i]}</figcaption>
						</figure>
					{/each}
				</div>
			{:else if item.kind === 'drawing'}
				<figure class="grid gap-3">
					<img
						{@attach reveal}
						src={item.image.src}
						alt={item.image.alt}
						width={item.image.width}
						height={item.image.height}
						loading="lazy"
						decoding="async"
						class="w-full border border-line"
					/>
					<figcaption class="text-sm text-muted">{item.caption}</figcaption>
				</figure>
			{/if}
		{/each}
	</div>
</div>

<a
	href={resolve('/projects/[slug]', { slug: next.slug })}
	class="next group relative block overflow-hidden bg-navy text-pale"
>
	<img
		{@attach reveal}
		src={next.detailHero.src}
		alt=""
		width={next.detailHero.width}
		height={next.detailHero.height}
		loading="lazy"
		decoding="async"
		class="h-[56svh] min-h-[360px] w-full object-cover opacity-70 transition-[opacity,transform] duration-700 ease-cut group-hover:scale-[1.02] group-hover:opacity-90"
	/>
	<div class="wrap absolute inset-x-0 bottom-0 grid gap-2 pb-10 md:pb-14">
		<span class="font-display text-xl text-on-navy-muted italic">Next project</span>
		<span class="font-display text-4xl md:text-6xl">{next.title}</span>
	</div>
</a>

<style>
	.shade {
		background:
			linear-gradient(to bottom, rgb(25 28 34 / 0.55), transparent 25%),
			linear-gradient(to top, rgb(25 28 34 / 0.85), transparent 55%);
	}

	.hero-image {
		animation: settle 2.4s var(--ease-cut) both;
	}

	@keyframes settle {
		from {
			transform: scale(1.06);
		}
	}

	.pin {
		position: absolute;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		translate: -50% -50%;
		border-radius: 999px;
		background: var(--color-orange);
		color: var(--color-navy);
		font-size: 0.75rem;
		font-weight: 600;
		box-shadow: 0 0 0 6px rgb(237 114 21 / 0.25);
		transition:
			box-shadow 0.3s var(--ease-cut),
			scale 0.3s var(--ease-cut);
	}

	/* Larger hit area than the visible dot */
	.pin::before {
		content: '';
		position: absolute;
		inset: -10px;
	}

	.pin.is-active {
		scale: 1.12;
		box-shadow: 0 0 0 10px rgb(237 114 21 / 0.3);
	}

	.next::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgb(25 28 34 / 0.8), transparent 60%);
		pointer-events: none;
	}

	.next > div {
		z-index: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-image {
			animation: none;
		}
	}
</style>
