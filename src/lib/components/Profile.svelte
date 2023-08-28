<script lang="ts">
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Avatar from '$comp/Avatar.svelte';
	import UploadAvatar from './UploadAvatar.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FollowButton from './FollowButton.svelte';

	export let profile: PublicProfile;
	export let supabase: SupabaseClient;

	let profileForm: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form
	method="post"
	action="?/update"
	use:enhance={handleSubmit}
	bind:this={profileForm}
	id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
	class="flex h-full w-full flex-col items-center justify-center"
>
	<article class="card h-4/5 w-4/5 rounded-tl-container-token rounded-tr-container-token">
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
