<script lang="ts">
	import type { Glyph } from '#lib/data/glyphs.js';

	// One of the brand deck's icons, drawn in the current fill colour.
	let { paths, class: className = '' }: { paths: Glyph; class?: string } = $props();
</script>

<svg viewBox="0 0 24 24" class={className} aria-hidden="true">
	{#each paths as path, i (i)}
		<path transform={path.transform} d={path.d} />
	{/each}
</svg>
