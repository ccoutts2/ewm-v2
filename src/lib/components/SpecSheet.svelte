<script lang="ts">
	import type { SpecRow } from '#lib/data/projects.js';

	let {
		rows,
		scope,
		active = $bindable(null)
	}: { rows: SpecRow[]; scope: string[]; active?: string | null } = $props();
</script>

<aside aria-labelledby="spec-title" class="grid gap-6">
	<h2 id="spec-title" class="font-sans text-sm font-semibold">Specification</h2>

	<dl class="grid grid-cols-[6.5rem_minmax(0,1fr)] border-t border-navy text-[0.9375rem]">
		{#each rows as row (row.label)}
			<div
				class="row col-span-2 grid grid-cols-subgrid border-b border-line py-3"
				class:is-active={row.key && active === row.key}
				onmouseenter={() => (active = row.key ?? null)}
				onmouseleave={() => (active = null)}
				role="presentation"
			>
				<dt class="text-muted">{row.label}</dt>
				<dd class="flex gap-2">
					{#if row.key}
						<span class="key" aria-label="Marked {row.key} on the photograph">{row.key}</span>
					{/if}
					<span>{row.value}</span>
				</dd>
			</div>
		{/each}
		<div class="col-span-2 grid grid-cols-subgrid py-3">
			<dt class="text-muted">Our scope</dt>
			<dd>{scope.join(', ')}</dd>
		</div>
	</dl>
</aside>

<style>
	.key {
		display: inline-grid;
		place-items: center;
		flex: none;
		width: 1.25rem;
		height: 1.25rem;
		margin-top: 0.15rem;
		border-radius: 999px;
		background: var(--color-orange);
		color: var(--color-navy);
		font-size: 0.6875rem;
		font-weight: 600;
	}

	.row {
		transition: background-color 0.25s ease;
	}

	.row.is-active {
		background: var(--color-pale);
		box-shadow:
			-0.5rem 0 0 var(--color-pale),
			0.5rem 0 0 var(--color-pale);
	}
</style>
