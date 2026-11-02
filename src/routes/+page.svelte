<script lang="ts">
	import { resolve } from '$app/paths';
	import ContactForm from '#lib/components/ContactForm.svelte';
	import HeroCarousel from '#lib/components/HeroCarousel.svelte';
	import WLine from '#lib/components/WLine.svelte';
	import Glyph from '#lib/components/Glyph.svelte';
	import { products } from '#lib/data/products.js';
	import { projects } from '#lib/data/projects.js';
	import { company, contacts, disciplines, sectors, suppliers } from '#lib/data/site.js';
	import { reveal } from '#lib/reveal.js';

	const slides = [
		...projects.map((project) => ({
			image: project.carousel,
			title: project.title,
			slug: project.slug
		})),
		{
			image: {
				src: '/images/ewm/media-wall.jpg',
				alt: 'Dark oak media wall with an inset fire, globe pendant lights and a lit alcove of fluted panelling',
				width: 1428,
				height: 2000
			},
			title: 'Media wall, Chelsea'
		},
		{
			image: {
				src: '/images/placeholder/hero-library.jpg',
				alt: 'Placeholder for library joinery',
				width: 2400,
				height: 1350
			},
			title: 'Library, Richmond'
		}
	];

	let enquiryOpen = $state(false);

	const designSteps = [
		{
			title: 'Concept design',
			text: 'We start with your drawings or your brief, then develop the piece with visual renders so everyone can see the result before anything is made.'
		},
		{
			title: 'Manufacturing design',
			text: 'Once the concept is approved we produce technical drawings, source material samples and prepare 3D visuals for the workshop.'
		}
	];
</script>

<svelte:head>
	<title>EWM Bespoke Interiors | Family-run joinery and upholstery, London</title>
	<meta
		name="description"
		content="Family-run bespoke joinery and upholstery for interior designers, developers and private clients. Drawn, made and fitted from our Thamesmead workshop."
	/>
</svelte:head>

<div data-rail="Selected work"><HeroCarousel {slides} /></div>

<section class="relative overflow-hidden bg-navy text-pale" data-rail="Our story">
	<WLine class="top-[-2%] left-[-3%] h-[130%] opacity-80" />
	<div class="wrap relative grid gap-10 py-24 md:grid-cols-12 md:py-36">
		<h2 class="text-5xl md:col-span-6 md:text-7xl">Designed <em>to perfection</em></h2>
		<div class="grid content-end gap-6 text-on-navy-muted md:col-span-5 md:col-start-8">
			<p class="text-lg text-pale">
				EWM Bespoke Interiors is a family-run joinery and upholstery company. We draw, make and fit
				interiors for designers, developers and private clients across London.
			</p>
			<p>
				Everything is made in our workshop in Thamesmead by a team we employ directly, and fitted by
				the same people. We have been doing it for over 40 years.
			</p>
			<a href="#about" class="link-cut justify-self-start font-medium text-orange">Our story</a>
		</div>
	</div>
</section>

<section id="projects" class="scroll-mt-16 py-24 md:py-36" data-rail="Selected projects">
	<div class="wrap">
		<div class="grid gap-4 md:grid-cols-12 md:items-end">
			<h2 class="heading-rule text-4xl md:col-span-6 md:text-6xl">Selected projects</h2>
			<p class="max-w-md text-muted md:col-span-4 md:col-start-9">
				Every piece is drawn, made and fitted by our own team. Each project lists the materials and
				finishes we used.
			</p>
		</div>

		<div class="mt-20 grid gap-24 md:mt-28 md:gap-36">
			{#each projects as project, index (project.slug)}
				<article class="grid items-end gap-8 md:grid-cols-12">
					<a
						href={resolve('/projects/[slug]', { slug: project.slug })}
						class="block overflow-hidden md:col-span-6 {index % 2
							? 'md:order-2 md:col-start-7'
							: ''}"
						tabindex="-1"
						aria-hidden="true"
					>
						<img
							{@attach reveal}
							src={project.cover.src}
							alt=""
							width={project.cover.width}
							height={project.cover.height}
							loading="lazy"
							decoding="async"
							class="aspect-4/5 w-full object-cover transition-transform duration-700 ease-cut hover:scale-[1.02]"
						/>
					</a>
					<div class="grid gap-5 md:col-span-4 {index % 2 ? 'md:col-start-2' : 'md:col-start-8'}">
						<h3 class="text-3xl md:text-4xl">
							<a href={resolve('/projects/[slug]', { slug: project.slug })} class="link-cut"
								>{project.title}</a
							>
						</h3>
						<p class="text-muted">{project.summary}</p>
						<dl class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 border-t border-line pt-5 text-sm">
							<dt class="text-muted">Designer</dt>
							<dd>{project.designer}</dd>
							<dt class="text-muted">Scope</dt>
							<dd>{project.scope.join(', ')}</dd>
						</dl>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="what-we-do" class="scroll-mt-16 bg-pale py-24 md:py-36" data-rail="What we do">
	<div class="wrap">
		<div class="grid gap-4 md:grid-cols-12 md:items-end">
			<h2 class="heading-rule text-4xl md:col-span-6 md:text-6xl">What we do</h2>
			<p class="max-w-md text-muted md:col-span-4 md:col-start-9">
				Our directly employed manufacturing and installation team brings over 50 years of combined
				experience to spaces that are made around you.
			</p>
		</div>

		<!-- Our expertise: the deck's orange icon tiles (slide 7) with what each trade covers -->
		<ul class="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
			{#each disciplines as discipline (discipline.title)}
				<li class="grid content-start gap-4 border-t border-line pt-6">
					<span class="grid size-12 place-items-center bg-orange">
						<Glyph paths={discipline.icon} class="size-7 fill-navy" />
					</span>
					<h3 class="text-2xl">{discipline.title}</h3>
					<ul class="grid gap-1 text-[0.9375rem] text-muted">
						{#each discipline.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<!-- Sectors, from page 4 of the concept presentation -->
		<div class="mt-24 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
			<div class="md:col-span-4">
				<h3 class="text-3xl">Who we make for</h3>
				<p class="mt-4 text-muted">
					Most of our work is in private homes. The same workshop and team also make for shops,
					listed buildings and offices.
				</p>
			</div>
		</div>

		<ul class="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
			{#each sectors as sector, index (sector.title)}
				<li class="grid content-start gap-6 {index % 2 ? 'md:mt-28' : ''}">
					<img
						{@attach reveal}
						src={sector.image.src}
						alt={sector.image.alt}
						width={sector.image.width}
						height={sector.image.height}
						loading="lazy"
						decoding="async"
						class="aspect-3/2 w-full object-cover"
					/>
					<div class="grid gap-4">
						<h4 class="heading-rule font-display text-3xl">{sector.title}</h4>
						<p class="max-w-lg text-muted">{sector.text}</p>
					</div>
					{#if sector.title === 'Residential'}
						<ul class="grid grid-cols-2 gap-x-6">
							{#each products as product (product.name)}
								<li class="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem]">
									<Glyph paths={product.paths} class="size-6 shrink-0 fill-orange" />
									{product.name}
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="mt-24 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
			<div class="md:col-span-4">
				<h3 class="text-3xl">Design service</h3>
				<p class="mt-4 text-muted">From a first sketch to drawings the workshop can build from.</p>
			</div>
			<ol class="grid gap-10 sm:grid-cols-2 md:col-span-7 md:col-start-6">
				{#each designSteps as step, index (step.title)}
					<li class="grid content-start gap-3">
						<span class="font-display text-6xl leading-none tabular-nums" aria-hidden="true"
							>{String(index + 1).padStart(2, '0')}</span
						>
						<h4 class="text-lg font-semibold">
							<span class="sr-only">Step {index + 1}:</span>
							{step.title}
						</h4>
						<span class="step-rule" class:has-arrow={index < designSteps.length - 1}></span>
						<p class="text-[0.9375rem] text-muted">{step.text}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- Who we work with, from the concept presentation. Grey blocks stand in for supplier logos. -->
<section class="border-b border-line py-20 md:py-28" data-rail="Who we work with">
	<div class="wrap grid gap-12 md:grid-cols-12 md:items-center">
		<div class="grid gap-4 md:col-span-4">
			<h2 class="heading-rule text-4xl md:text-5xl">Who we <em>work with</em></h2>
			<p class="text-muted">
				The makers whose boards, fabrics, finishes and hardware go into our work.
			</p>
		</div>
		<ul class="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 md:col-span-7 md:col-start-6">
			{#each suppliers as supplier, index (supplier)}
				<li class="grid h-28 place-items-center bg-ground px-6">
					<span
						class="block h-6 rounded-sm bg-muted/20"
						style:width="{[62, 48, 70, 80, 56, 74, 60, 52, 66][index]}%"
						title="{supplier} logo to follow"
					></span>
					<span class="sr-only">{supplier}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section id="about" class="scroll-mt-16 py-24 md:py-36" data-rail="About us">
	<div class="wrap grid gap-12 md:grid-cols-12 md:items-center">
		<img
			{@attach reveal}
			src="/images/placeholder/family.jpg"
			alt="Placeholder for a portrait of Johnnie and Georgie Wynne in the workshop"
			width="1200"
			height="1500"
			loading="lazy"
			decoding="async"
			class="aspect-4/5 w-full object-cover md:col-span-5"
		/>
		<div class="grid gap-6 md:col-span-5 md:col-start-8">
			<h2 class="heading-rule text-4xl md:text-6xl">A family business</h2>
			<p class="text-lg">
				Johnnie and Georgie Wynne run EWM together. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<p class="text-muted">
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			</p>
			<dl
				class="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 border-t border-line pt-6 text-[0.9375rem]"
			>
				<dt class="text-muted">Experience</dt>
				<dd>Over 40 years</dd>
				<dt class="text-muted">Team</dt>
				<dd>Joiners, upholsterers, sprayers and fitters, all directly employed</dd>
				<dt class="text-muted">Workshop</dt>
				<dd>Thamesmead, London SE28</dd>
			</dl>
		</div>
	</div>

	<figure class="wrap mt-24 md:mt-36">
		<img
			{@attach reveal}
			src="/images/placeholder/workshop.jpg"
			alt="Placeholder for a wide view of the Thamesmead workshop"
			width="2400"
			height="1350"
			loading="lazy"
			decoding="async"
			class="aspect-video w-full object-cover"
		/>
		<figcaption class="mt-3 text-sm text-muted">The workshop at Nathan Way, Thamesmead.</figcaption>
	</figure>
</section>

<!-- The closing line of the Residential Capabilities deck, over the same photograph -->
<section class="relative grid min-h-[70svh] items-end overflow-hidden bg-navy text-pale">
	<img
		src="/images/ewm/media-wall.jpg"
		alt=""
		width="1428"
		height="2000"
		loading="lazy"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover object-[50%_65%]"
	/>
	<div class="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/40 to-navy/20"></div>
	<p class="wrap relative w-full pb-20 font-display text-4xl leading-tight md:pb-28 md:text-6xl">
		Made for your space.<br />Crafted for your lifestyle.
	</p>
</section>

<section
	id="contact"
	class="relative scroll-mt-16 overflow-hidden bg-navy py-24 text-pale md:py-36"
	data-rail="Get in touch"
>
	<WLine class="top-[-2%] right-[4%] hidden h-[130%] opacity-35 md:block" />
	<div class="wrap relative grid gap-14 md:grid-cols-12">
		<div class="grid content-start gap-6 md:col-span-5">
			<h2 class="heading-rule text-4xl md:text-6xl">We’d love to hear from you</h2>
			<p class="text-on-navy-muted">
				Send us drawings or a brief and we’ll arrange a free consultation, by phone or at the
				workshop.
			</p>
			<div class="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
				<button
					type="button"
					class="flex cursor-pointer items-center gap-3 bg-orange px-6 py-3.5 text-sm font-semibold text-navy transition-transform active:scale-[0.98]"
					aria-expanded={enquiryOpen}
					aria-controls="enquiry"
					onclick={() => (enquiryOpen = !enquiryOpen)}
				>
					Tell us about your project
					<svg class="toggle-icon size-4" viewBox="0 0 24 24" aria-hidden="true"
						><path d="M12 5v14M5 12h14" /></svg
					>
				</button>
				<a href="mailto:{company.email}" class="link-cut text-sm text-pale"
					>or email {company.email}</a
				>
			</div>

			<!-- Opens in place under the button, so the section looks unchanged until asked. -->
			<div id="enquiry" class="enquiry" class:is-open={enquiryOpen} inert={!enquiryOpen}>
				<div class="min-h-0 overflow-hidden">
					<div class="pt-4">
						<ContactForm />
					</div>
				</div>
			</div>
		</div>

		<div
			class="grid content-start gap-10 text-[0.9375rem] sm:grid-cols-2 md:col-span-6 md:col-start-7 md:grid-cols-1 xl:grid-cols-2"
		>
			{#each contacts as person (person.email)}
				<div class="grid content-start gap-1 border-t border-line-dark pt-5">
					<h3 class="mb-2 text-xl">{person.name}</h3>
					<!-- Lets a long address wrap before the @ rather than overflow its column -->
					<a
						href="mailto:{person.email}"
						class="link-cut justify-self-start [overflow-wrap:anywhere] text-orange"
						>{person.email.split('@')[0]}<wbr />@{person.email.split('@')[1]}</a
					>
					<a
						href="tel:{person.phone.replaceAll(' ', '')}"
						class="link-cut justify-self-start tabular-nums">{person.phone}</a
					>
				</div>
			{/each}
			<div class="grid content-start gap-1 border-t border-line-dark pt-5">
				<h3 class="mb-2 text-xl">Workshop</h3>
				<address class="text-on-navy-muted not-italic">
					{#each company.address as line (line)}{line}<br />{/each}
				</address>
			</div>
			<div class="grid content-start gap-1 border-t border-line-dark pt-5">
				<h3 class="mb-2 text-xl">Opening hours</h3>
				<p class="text-on-navy-muted">{company.hours}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.enquiry {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows 0.7s var(--ease-cut),
			opacity 0.5s ease;
	}

	.enquiry.is-open {
		grid-template-rows: 1fr;
		opacity: 1;
	}

	/* Short orange rule under section headings, from the concept presentation */
	.heading-rule::after {
		content: '';
		display: block;
		width: 48px;
		height: 2px;
		margin-top: 1.5rem;
		background: var(--color-orange);
	}

	/* The design steps are joined by an arrowed rule, as on slide 13 of the capabilities deck */
	.step-rule {
		position: relative;
		display: block;
		height: 1px;
		margin-block: 0.25rem 0.5rem;
		background: var(--color-line);
	}

	.step-rule.has-arrow {
		background: var(--color-orange);
	}

	.step-rule.has-arrow::after {
		content: '';
		position: absolute;
		right: 0;
		top: -3.5px;
		width: 8px;
		height: 8px;
		border-top: 1px solid var(--color-orange);
		border-right: 1px solid var(--color-orange);
		rotate: 45deg;
	}

	.toggle-icon {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		transition: rotate 0.35s var(--ease-cut);
	}

	[aria-expanded='true'] .toggle-icon {
		rotate: 45deg;
	}

	@media (prefers-reduced-motion: reduce) {
		.enquiry,
		.toggle-icon {
			transition: none;
		}
	}
</style>
