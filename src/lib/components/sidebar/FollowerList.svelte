<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Loading from '$comp/Loading.svelte';
	import { fade } from 'svelte/transition';
	import { profileStore } from '$stores/profile';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';

	export let sclient: SocialClient;

	let get_profiles: Promise<TProfile[]> | [] = [];

	profileStore.subscribe((profile) => {
		if (!profile) return;
		get_profiles = sclient.users.getFollowers(profile.uid);
	});

	$: filtered = (profiles: TProfile[]) => {
		return profiles.filter((profile) => profile.is_follower);
	};

	const handleRemove = (uid: string) => {};
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await get_profiles}
		<Loading />
	{:then profiles}
		{#if filtered(profiles).length > 0}
			{#each filtered(profiles) as profile}
				<ProfileCard {sclient} {profile}>
					<button
						type="button"
						class="variant-ghost-warning btn-sm rounded-token"
						on:click={() => handleRemove(profile.uid)}
					>
						Remove</button
					>
				</ProfileCard>
			{/each}
		{:else}
			<p class="text-center text-lg">No Followers</p>
		{/if}
	{/await}
</section>
