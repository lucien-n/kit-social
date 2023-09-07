<script lang="ts">
	import ProfileCardPlaceholder from '$comp/profile/ProfileCardPlaceholder.svelte';
	import type SocialClient from '$sclient/sclient';
	import { fade } from 'svelte/transition';
	import { profileStore } from '$stores/profile';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';
	import { formatDatePrecise } from '$lib/utilities/methods';

	export let sclient: SocialClient;

	let get_profiles: Promise<TProfile[]> | [] = [];

	profileStore.subscribe((profile) => {
		if (!profile) return;
		get_profiles = sclient.users.getFollowedUsers(profile.uid);
	});
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await get_profiles}
		{#each { length: 5 } as _}
			<ProfileCardPlaceholder />
		{/each}
	{:then profiles}
		{#if profiles.length > 0}
			{#each profiles as profile}
				<ProfileCard {sclient} {profile} let:P>
					<p class="italic opacity-70">
						{P.is_online ? 'Online' : `Last seen: ${formatDatePrecise(profile.last_seen)}`}
					</p>
				</ProfileCard>
			{/each}
		{:else}
			<p class="text-center text-lg">No Followings</p>
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
</section>
