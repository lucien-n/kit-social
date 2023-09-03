<script lang="ts">
	import type { TPublicProfile } from '$types/public_profile.type';
	import ProfileCardPlaceholder from '$comp/profile/ProfileCardPlaceholder.svelte';
	import Followed from '$comp/profile/Followed.svelte';
	import type SocialClient from '$sclient/sclient';
	import { fade } from 'svelte/transition';

	export let sclient: SocialClient;
	export let followed_users: Promise<TPublicProfile[]>;
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await followed_users}
		{#each { length: 5 } as _}
			<ProfileCardPlaceholder />
		{/each}
	{:then profiles}
		{#if profiles.length > 0}
			{#each profiles as profile}
				<Followed {sclient} {profile} />
			{/each}
		{:else}
			<p class="text-center text-lg">No Followings</p>
		{/if}
	{:catch e}
		<p>{e}</p>
	{/await}
</section>
