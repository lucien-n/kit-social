<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Loading from '$comp/Loading.svelte';
	import { fade } from 'svelte/transition';
	import { profileStore } from '$stores/profile';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { toasts } from '$lib/utilities/toasts';

	export let sclient: SocialClient;

	const toast_store = getToastStore();

	let get_profiles: Promise<TProfile[]> | [] = [];

	profileStore.subscribe((profile) => {
		if (!profile) return;
		get_profiles = sclient.users.getFollowers(profile.uid);
	});

	$: filtered = (profiles: TProfile[]) => {
		return profiles.filter((profile) => profile.is_follower);
	};

	const handleRemove = async (profile: TProfile) => {
		const success = await sclient.users.removeFollower(profile.uid);
		if (!success)
			toast_store.trigger(toasts.error(`Error while removing ${profile.name} from your followers`));
	};
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
						on:click={() => handleRemove(profile)}
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
