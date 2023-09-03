<script lang="ts">
	import Follower from '$comp/Follower.svelte';
	import Loading from '$comp/Loading.svelte';
	import type SocialClient from '$sclient/sclient';
	import type { TPublicProfile } from '$types/public_profile.type';

	export let data: { sclient: SocialClient; streamed: { followers: Promise<TPublicProfile[]> } };

	let {
		sclient,
		streamed: { followers }
	} = data;

	$: filtered = (profiles: TPublicProfile[]) => {
		return profiles.filter((profile) => profile.is_follower);
	};
</script>

<section>
	{#await followers}
		<Loading />
	{:then profiles}
		{#if profiles}
			{#each filtered(profiles) as profile}
				<Follower {sclient} {profile} on:remove={() => (profile.is_follower = false)} />
			{/each}
		{/if}
	{/await}
</section>
