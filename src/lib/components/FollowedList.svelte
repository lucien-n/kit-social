<script lang="ts">
	import { getFollowedUsersUids, getProfile } from '$api/profiles';
	import { profileStore } from '$stores/profile';
	import { profilesStore } from '$stores/profiles';
	import type { PublicProfile } from '$types/public_profile.type';
	import ProfileCardPlaceholder from '$comp/ProfileCardPlaceholder.svelte';
	import FollowedProfileCard from '$comp/FollowedProfileCard.svelte';

	const getFollowedProfiles = async () => {
		const uids = await getFollowedUsersUids($profileStore?.uid);

		const profiles: PublicProfile[] = [];

		for (let uid of uids) {
			if (profilesStore.contains({ uid })) {
				profiles.push(profilesStore.get({ uid }) || ({} as PublicProfile));
				return;
			}

			const profile = await getProfile(uid);

			if (!profile) return;

			profiles.push(profile);
			profilesStore.add(profile);
		}

		return profiles;
	};
</script>

<section>
	{#await getFollowedProfiles()}
		{#each { length: 5 } as _}
			<ProfileCardPlaceholder />
		{/each}
	{:then profiles}
		{#if profiles}
			{#each profiles as profile}
				<FollowedProfileCard {profile} />
			{/each}
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
</section>
