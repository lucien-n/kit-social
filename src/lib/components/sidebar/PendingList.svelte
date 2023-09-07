<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Icon from '@iconify/svelte';
	import PendingFollow from '$comp/sidebar/PendingFollow.svelte';
	import { fade } from 'svelte/transition';
	import { profileStore } from '$stores/profile';
	import Loading from '$comp/Loading.svelte';

	export let sclient: SocialClient;

	let get_pendings: Promise<TPendingFollow[]> | [] = [];

	profileStore.subscribe((profile) => {
		if (!profile) return;
		get_pendings = sclient.users.getPendingFollows(profile.uid);
	});

	$: filtered = (pendings: TPendingFollow[]) => {
		return pendings.filter((pending) => pending.state == 'pending');
	};
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await get_pendings}
		<Loading />
	{:then pendings}
		{#if pendings.length > 0}
			{#each filtered(pendings) as pending_follow}
				<PendingFollow
					{sclient}
					{pending_follow}
					on:state={({ detail }) => (pending_follow.state = detail)}
				/>
			{/each}
		{:else}
			<p class="text-center text-lg">No Pending Follow</p>
		{/if}
	{/await}
</section>
