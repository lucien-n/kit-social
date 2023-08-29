<script lang="ts">
	import { getProfile } from '$api/profiles';
	import { enhance } from '$app/forms';
	import Avatar from '$comp/Avatar.svelte';
	import FollowButton from '$comp/FollowButton.svelte';
	import UploadAvatar from '$comp/UploadAvatar.svelte';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: { supabase: SupabaseClient; error: string; username: string };

	let { supabase, error, username } = data;
	$: ({ supabase, username } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<section class="flex h-full w-full items-center justify-center">
	{#if error}
		<h1 class="h1">{error}</h1>
	{:else}
		{#await getProfile({ username })}
			<span class="animate-spin">
				<Icon icon="mdi:loading" width={100} />
			</span>
		{:then profile}
			{#if profile}
				<form
					method="post"
					action="?/update"
					use:enhance={handleSubmit}
					bind:this={profileForm}
					id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
					class="flex h-full w-full flex-col items-center justify-center"
				>
					<article class="card h-4/5 w-full rounded-tl-container-token rounded-tr-container-token">
						<section
							class="flex h-1/4 items-center justify-between bg-surface-900 p-5 rounded-tl-container-token rounded-tr-container-token"
						>
							<div class="flex items-center gap-4">
								<div class="relative">
									<Avatar {profile} width="w-24" />
									{#if $profileStore?.uid == profile.uid}
										<UploadAvatar
											{supabase}
											on:upload={() => {
												profileForm.requestSubmit();
											}}
										/>
									{/if}
								</div>
								<div>
									<h2 class="h2">{profile.name}</h2>
								</div>
							</div>
							<FollowButton {profile} />
						</section>
						<section class="p-3" />
					</article>
				</form>
			{:else}
				<h1 class="h1">Profile not found</h1>
			{/if}
		{:catch e}
			<h1 class="h1">{e}</h1>
		{/await}
	{/if}
</section>
