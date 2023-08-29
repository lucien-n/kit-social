<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
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
		<h3 class="h3 text-center">Sign Up</h3>
		{#if form?.error}
			<br />
			<div class="variant-ghost-error px-2 py-1">{form.error}</div>
		{/if}
		{#if form?.message}
			<br />
			<div class="variant-ghost-primary px-2 py-1">{form.message}</div>
		{/if}
		<br />
		<form method="post" use:enhance={handleSubmit} class="flex flex-col gap-y-2">
			<Input
				value={form?.values?.username}
				type="text"
				id="username"
				name="username"
				label="Username"
				required
			/>
			<Input
				value={form?.values?.email}
				type="email"
				id="email"
				name="email"
				label="Email"
				required
			/>
			<Input type="password" id="password" name="password" label="Password" required />
			<br />
			<button disabled={loading} class="variant-ghost-surface btn mx-auto flex w-1/2" name="sign-up"
				>Sign Up</button
			>
		</form>

		<div class="mt-6">
			<p class="text-center">
				Already have an account? <a href="/auth/signin" class="font-bold hover:underline">Sign in</a
				>
			</p>
		</div>
	</div>
</section>
