<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Input from '$comp/form/Input.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<section class="flex h-full w-full items-center justify-center">
	<div class="card w-full p-4 lg:w-1/2 xl:w-1/3">
		<h3 class="h3 text-center">Sign In</h3>
		{#if form?.error}
			<br />
			<div class="variant-ghost-error px-2 py-1">{form.error}</div>
		{/if}

		<br />

		<form method="post" use:enhance={handleSubmit}>
			<Input value={form?.values?.email} type="email" id="email" name="email" label="Email" />
			<Input type="password" id="password" name="password" label="Password" />
			<br />
			<button disabled={loading} class="variant-ghost-surface btn mx-auto flex w-1/2"
				>Sign in</button
			>
		</form>

		<div class="mt-6">
			<p class="text-center">
				Don't have an account? <a href="/auth/signup" class="font-bold hover:underline">Sign up</a>
			</p>
		</div>
	</div>
</section>
