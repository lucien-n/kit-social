<script lang="ts">
	import type { PublicProfile } from '$types/public_profile.type';
	import ProfileCardPlaceholder from '$comp/ProfileCardPlaceholder.svelte';
	import FollowedProfileCard from '$comp/FollowedProfileCard.svelte';
	import type KClient from '$kclient/kclient';

	export let kclient: KClient;
	export let followed_users: Promise<PublicProfile[] | null>;
</script>

<section>
	{#await followed_users}
		{#each { length: 5 } as _}
			<ProfileCardPlaceholder />
		{/each}
	{:then profiles}
		{#if profiles}
			{#each profiles as profile}
				<FollowedProfileCard {kclient} {profile} />
			{/each}
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
</section>
