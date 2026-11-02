<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const links = [
		{ href: resolve('/#what-we-do'), label: 'What we do' },
		{ href: resolve('/#projects'), label: 'Projects', section: '/projects' },
		{ href: resolve('/#about'), label: 'About us' },
		{ href: resolve('/#contact'), label: 'Get in touch' }
	];

	let scrollY = $state(0);
	let menuOpen = $state(false);

	const solid = $derived(scrollY > 48 || menuOpen);

	afterNavigate(() => (menuOpen = false));
</script>

<svelte:window bind:scrollY />

<header
	class="fixed inset-x-0 top-0 z-50 text-pale transition-colors duration-500"
	class:bg-navy={solid}
	class:shadow-header={solid}
>
	<div class="wrap flex h-18 items-center justify-between gap-6">
		<a href={resolve('/')} class="block shrink-0" aria-label="EWM Bespoke Interiors, home">
			<img
				src="/images/ewm/monogram-orange.svg"
				alt=""
				width="480"
				height="161"
				class="h-8 w-auto"
			/>
		</a>

		<nav aria-label="Main" class="hidden md:block">
			<ul class="flex gap-10 text-[0.8125rem] font-medium">
				{#each links as link (link.href)}
					{@const current = link.section && page.url.pathname.startsWith(link.section)}
					<li>
						<a href={link.href} class="nav-link" aria-current={current ? 'page' : undefined}
							>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<button
			type="button"
			class="-mr-2 p-2 text-[0.8125rem] font-medium md:hidden"
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? 'Close' : 'Menu'}
		</button>
	</div>

	{#if menuOpen}
		<nav id="mobile-menu" aria-label="Main" class="wrap pb-10 md:hidden">
			<ul class="grid gap-4 border-t border-line-dark pt-8">
				{#each links as link (link.href)}
					<li><a href={link.href} class="font-display text-3xl">{link.label}</a></li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>

<style>
	.shadow-header {
		box-shadow: 0 1px 0 var(--color-line-dark);
	}

	/* Active and hover marker: a short bar slanted at the W's 25 degrees */
	.nav-link {
		position: relative;
		display: inline-block;
		padding-block: 0.5rem;
		transition: color 0.2s ease;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background: var(--color-orange);
		transform: scaleX(0) skewX(-25deg);
		transform-origin: left;
		transition: transform 0.45s var(--ease-cut);
	}

	.nav-link:hover::after,
	.nav-link[aria-current='page']::after {
		transform: scaleX(1) skewX(-25deg);
	}
</style>
