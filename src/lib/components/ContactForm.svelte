<script lang="ts">
	import { projectTypes, roles, timings } from '#lib/data/enquiry.js';

	// UI only for now. Sending will go through Resend from a non-prerendered endpoint
	// (the site sets prerender = true, so a form action on this page won't run).

	let status = $state<'idle' | 'sending' | 'sent'>('idle');

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		status = 'sending';
		await new Promise((resolve) => setTimeout(resolve, 900));
		status = 'sent';
	}
</script>

{#if status === 'sent'}
	<div class="grid gap-3 border-t border-line-dark pt-8" role="status">
		<p class="font-display text-3xl">Thank you.</p>
		<p class="text-on-navy-muted">
			Your enquiry is with Johnnie and Georgie. We’ll be in touch to arrange a call or a visit to
			the workshop.
		</p>
	</div>
{:else}
	<form class="grid gap-9 border-t border-line-dark pt-8" {onsubmit}>
		<fieldset class="grid gap-3">
			<legend class="label mb-3">I’m a</legend>
			<div class="flex flex-wrap gap-2">
				{#each roles as role, index (role)}
					<label class="chip">
						<input type="radio" name="role" value={role} required={index === 0} />
						<span>{role}</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<div class="grid gap-7 sm:grid-cols-2">
			<label class="field">
				<span class="label">Name</span>
				<input name="name" autocomplete="name" required />
			</label>
			<label class="field">
				<span class="label">Email</span>
				<input name="email" type="email" autocomplete="email" required />
			</label>
			<label class="field">
				<span class="label">Phone <span class="opacity-70">(optional)</span></span>
				<input name="phone" type="tel" autocomplete="tel" />
			</label>
			<label class="field">
				<span class="label">Company <span class="opacity-70">(optional)</span></span>
				<input name="company" autocomplete="organization" />
			</label>
		</div>

		<fieldset class="grid gap-3">
			<legend class="label mb-3">What’s the project?</legend>
			<div class="flex flex-wrap gap-2">
				{#each projectTypes as type (type)}
					<label class="chip">
						<input type="checkbox" name="type" value={type} />
						<span>{type}</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<label class="field">
			<span class="label">When would you like to start?</span>
			<select name="timing" required>
				<option value="" disabled selected>Choose a timeframe</option>
				{#each timings as timing (timing)}
					<option>{timing}</option>
				{/each}
			</select>
		</label>

		<label class="field">
			<span class="label">Tell us about it</span>
			<textarea
				name="message"
				rows="4"
				required
				placeholder="The space, the piece, any finishes you have in mind"></textarea>
		</label>

		<!-- Honeypot for when sending is wired up: people never see or fill this. -->
		<div class="hidden" aria-hidden="true">
			<input name="website" tabindex="-1" autocomplete="off" />
		</div>

		<button
			type="submit"
			class="justify-self-start bg-orange px-6 py-3.5 text-sm font-semibold text-navy transition-[transform,opacity] active:scale-[0.98] disabled:opacity-60"
			disabled={status === 'sending'}
		>
			{status === 'sending' ? 'Sending…' : 'Send enquiry'}
		</button>
	</form>
{/if}

<style>
	.label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-on-navy-muted);
	}

	.field {
		display: grid;
		gap: 0.5rem;
	}

	.field input,
	.field select,
	.field textarea {
		width: 100%;
		background: transparent;
		color: var(--color-pale);
		border: 0;
		border-bottom: 1px solid var(--color-line-dark);
		padding: 0.4rem 0 0.6rem;
		border-radius: 0;
		transition: border-color 0.2s ease;
	}

	.field textarea {
		resize: vertical;
		min-height: 6rem;
	}

	.field select {
		appearance: none;
		cursor: pointer;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3aab8' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right center;
		background-size: 18px;
	}

	.field select option {
		color: var(--color-navy);
	}

	.field ::placeholder {
		color: var(--color-on-navy-muted);
		opacity: 0.6;
	}

	.field input:hover,
	.field select:hover,
	.field textarea:hover {
		border-color: rgb(227 233 244 / 0.4);
	}

	.field input:focus-visible,
	.field select:focus-visible,
	.field textarea:focus-visible {
		outline: none;
		border-color: var(--color-orange);
	}

	.field :user-invalid {
		border-color: var(--color-red);
	}

	.chip {
		position: relative;
		cursor: pointer;
	}

	.chip input {
		position: absolute;
		opacity: 0;
		inset: 0;
		cursor: pointer;
	}

	.chip span {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		border: 1px solid var(--color-line-dark);
		border-radius: 999px;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.chip:hover span {
		border-color: rgb(227 233 244 / 0.4);
	}

	.chip input:checked + span {
		background: var(--color-pale);
		border-color: var(--color-pale);
		color: var(--color-navy);
	}

	.chip input:focus-visible + span {
		outline: 2px solid var(--color-orange);
		outline-offset: 3px;
	}
</style>
