<script lang="ts">
	import { enhance } from '$app/forms';
	import Avatar from '$comp/Avatar.svelte';
	import FollowButton from '$comp/FollowButton.svelte';
	import UploadAvatar from '$comp/UploadAvatar.svelte';
	import type SocialClient from '$kclient/kclient';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: { kclient: SocialClient; error: string; username: string };

	let { kclient, error, username } = data;
	$: ({ kclient, username } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	// TODO: VERY TEMPORARY SOLUTION
	let refresh = 0;
	const update = () => {
		refresh++;
	};
</script>

{#key refresh}
	<section class="flex h-full w-full items-center justify-center">
		{#if error}
			<h1 class="h1">{error}</h1>
		{:else}
			{#await kclient.users.getProfile({ username })}
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
						class="flex h-4/5 w-full flex-col items-center justify-center overflow-y-hidden"
					>
						<article
							class="card h-full w-full rounded-tl-container-token rounded-tr-container-token"
						>
							<section
								class="flex h-1/4 items-center justify-between bg-surface-900 p-5 rounded-tl-container-token rounded-tr-container-token"
							>
								<div class="flex items-center gap-4">
									<div class="relative">
										<Avatar {kclient} {profile} width="w-24" />
										{#if $profileStore?.uid == profile.uid}
											<UploadAvatar
												supabase={kclient.supabase}
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
								<FollowButton {profile} on:update={update} />
							</section>
							<section class="flex h-3/4 p-3">
								{#if !profile.is_followed && profile.is_private}
									<hgroup class="mx-auto self-center text-center">
										<h2 class="h2">This profile is private</h2>
										<p class="text-lg">Follow them to access their profile</p>
									</hgroup>
								{:else}
									<h2 class="h2">{profile.name}'s info</h2>
								{/if}
							</section>
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
{/key}
