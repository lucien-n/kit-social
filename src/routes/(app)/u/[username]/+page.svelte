<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import type SocialClient from '$sclient/sclient';
	import { profileStore } from '$stores/profile';
	import FollowButton from '$comp/FollowButton.svelte';
	import Avatar from '$comp/Avatar.svelte';
	import UploadAvatar from '$comp/UploadAvatar.svelte';

	export let data: { sclient: SocialClient; error: string; username: string };

	let { sclient, error, username } = data;
	$: ({ sclient, username } = data);

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
	<section class="flex h-full w-full items-center justify-center" id="profile">
		{#if error}
			<h1 class="h1">{error}</h1>
		{:else}
			{#await sclient.users.getProfile({ username })}
				<span class="animate-spin">
					<Icon icon="mdi:loading" width={100} />
				</span>
			{:then profile}
				{#if profile}
					<section class="flex h-full w-full items-center justify-center">
						<form
							method="post"
							action="?/update"
							use:enhance={handleSubmit}
							bind:this={profileForm}
							id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
							class="flex h-4/5 w-full flex-col overflow-y-hidden"
						>
							<article
								class="card h-full w-full rounded-tl-container-token rounded-tr-container-token"
							>
								<section
									class="relative flex h-1/4 items-center justify-between overflow-hidden p-5 rounded-tl-container-token rounded-tr-container-token"
								>
									<img
										src={profile.avatar_url}
										alt=""
										class="absolute aspect-auto w-full opacity-20 blur-[128px]"
									/>
									<div class="flex w-full items-center justify-between">
										<div class="flex items-center gap-4">
											<div class="relative">
												<Avatar {sclient} {profile} width="w-24" />
												{#if $profileStore?.uid == profile.uid}
													<UploadAvatar
														supabase={sclient.supabase}
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
									</div>
								</section>
								<section class="flex h-3/4 bg-surface-900 p-3">
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
					</section>
				{:else}
					<h1 class="h1">Profile not found</h1>
				{/if}
			{:catch e}
				<h1 class="h1">{e}</h1>
			{/await}
		{/if}
	</section>
{/key}
