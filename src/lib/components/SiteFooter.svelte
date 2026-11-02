<script lang="ts">
	import { company } from '#lib/data/site.js';

	const year = new Date().getFullYear();
</script>

<footer class="bg-navy text-on-navy-muted">
	<div class="wrap grid gap-10 py-14 text-sm md:grid-cols-[1fr_auto_1fr] md:items-center">
		<img
			src="/images/ewm/monogram-orange.png"
			alt="EWM"
			width="480"
			height="161"
			class="h-9 w-auto"
		/>

		<a href="#top" class="link-cut justify-self-start text-pale md:justify-self-center"
			>Return to the top</a
		>

		<div class="grid gap-1 md:justify-items-end md:text-right">
			<a
				href="https://www.instagram.com/ewm_bespoke_interiors/"
				class="link-cut justify-self-start text-pale md:justify-self-end"
				rel="noopener">Instagram</a
			>
			<p>{company.name}, {year}</p>
		</div>
	</div>
</footer>
