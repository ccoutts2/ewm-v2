<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let lenis: Lenis | undefined;

	// While Lenis is gliding it ignores native scrolls, so an unfinished glide would drag
	// SvelteKit's scroll reset or back-button restore towards the old target. Stop it first.
	// stop() and start() each cancel the glide; together they leave scrolling enabled.
	beforeNavigate(() => {
		lenis?.stop();
		lenis?.start();
	});

	// Smooth wheel scrolling. Lenis honours prefers-reduced-motion itself and leaves touch native.
	$effect(() => {
		const instance = new Lenis({ autoRaf: true });
		lenis = instance;

		// Lenis' own `anchors` option lets the browser jump to the hash as well, which cancels
		// the smooth scroll, so same-page hash links are handled here instead.
		const onclick = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

			const link = (event.target as Element).closest('a');
			if (!link?.hash || link.hasAttribute('data-native-scroll')) return;

			const url = new URL(link.href);
			if (url.origin !== location.origin || url.pathname !== location.pathname) return;

			const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
			if (!target) return;

			event.preventDefault();
			instance.scrollTo(target);
		};

		document.addEventListener('click', onclick, true);

		return () => {
			document.removeEventListener('click', onclick, true);
			instance.destroy();
			lenis = undefined;
		};
	});

	// Wipe the incoming page up over the old one (animation lives in layout.css).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Native jump so focus moves into the content for keyboard users -->
<a
	href="#main"
	data-native-scroll
	class="sr-only z-60 bg-orange px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
	>Skip to content</a
>

<div id="top"></div>
<SiteHeader />

<main id="main">
	{@render children()}
</main>

<SiteFooter />
