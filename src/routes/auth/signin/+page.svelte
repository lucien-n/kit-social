<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
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
		<form
			class="mb-2 flex w-full justify-center gap-3"
			action="/?/signin-with-oauth"
			method="post"
			use:enhance={handleSubmit}
		>
			<button class="variant-ghost-primary btn" name="provider" value="github" type="submit"
				>GitHub</button
			>
			<button class="variant-ghost-primary btn" name="provider" value="google" type="submit"
				>Google</button
			>
		</form>

		<h3 class="h3 text-center">Sign In</h3>
		{#if form?.error}
			<div class="variant-ghost-error px-2 py-1">{form.error}</div>
		{/if}

		<br />

		<!-- else content -->
		<form action="/?/signin-with-password" method="post" use:enhance={handleSubmit}>
			<section>
				<label for="email" class="label">Email</label>
				<input
					id="email"
					name="email"
					value={form?.values?.email ?? ''}
					class="input"
					type="email"
					placeholder="Email"
					required
				/>
			</section>
			<section>
				<label for="password" class="label">Password</label>
				<input
					id="password"
					name="password"
					class="input"
					type="password"
					placeholder="Password"
					required
				/>
			</section>
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
