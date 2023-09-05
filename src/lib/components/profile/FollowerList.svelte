<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Loading from '$comp/Loading.svelte';
	import Follower from '$comp/profile/Follower.svelte';
	import { fade } from 'svelte/transition';

	export let sclient: SocialClient;
	export let followers: Promise<TProfile[]>;

	$: filtered = (profiles: TProfile[]) => {
		return profiles.filter((profile) => profile.is_follower);
	};
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await followers}
		<Loading />
	{:then profiles}
		{#if filtered(profiles).length > 0}
			{#each filtered(profiles) as profile}
				<Follower {sclient} {profile} on:remove={() => (profile.is_follower = false)} />
			{/each}
		{:else}
			<p class="text-center text-lg">No Followers</p>
		{/if}
	{/await}
</section>
