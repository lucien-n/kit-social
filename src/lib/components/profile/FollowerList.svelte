<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import type { TPublicProfile } from '$types/public_profile.type';
	import Loading from '$comp/Loading.svelte';
	import Follower from '$comp/profile/Follower.svelte';

	export let sclient: SocialClient;
	export let followers: Promise<TPublicProfile[]>;

	$: filtered = (profiles: TPublicProfile[]) => {
		return profiles.filter((profile) => profile.is_follower);
	};
</script>

<section>
	{#await followers}
		<Loading />
	{:then profiles}
		{#if profiles.length > 1}
			{#each filtered(profiles) as profile}
				<Follower {sclient} {profile} on:remove={() => (profile.is_follower = false)} />
			{/each}
		{:else}
			<p class="text-center text-lg">No Followers</p>
		{/if}
	{/await}
</section>
