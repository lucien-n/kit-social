<script lang="ts">
	import type { TPublicProfile } from '$types/public_profile.type';
	import ProfileCardPlaceholder from '$comp/profile/ProfileCardPlaceholder.svelte';
	import Followed from '$comp/profile/Followed.svelte';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;
	export let followed_users: Promise<TPublicProfile[] | null>;
</script>

<section>
	{#await followed_users}
		{#each { length: 5 } as _}
			<ProfileCardPlaceholder />
		{/each}
	{:then profiles}
		{#if profiles}
			{#each profiles as profile}
				<Followed {sclient} {profile} />
			{/each}
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
</section>
