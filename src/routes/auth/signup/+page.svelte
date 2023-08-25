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
			<section>
				<label for="username" class="label">Username</label>
				<input
					id="username"
					name="username"
					value={form?.values?.username ?? ''}
					class="input"
					type="text"
					placeholder="Username"
					required
				/>
			</section>
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
