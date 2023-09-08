<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { profileStore } from '$stores/profile';
	import Loading from '$comp/Loading.svelte';
	import { toasts } from '$lib/utilities/toasts';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';

	export let sclient: SocialClient;

	const toast_store = getToastStore();

	let get_pendings: Promise<TPendingFollow[]> | [] = [];

	profileStore.subscribe((profile) => {
		if (!profile) return;
		get_pendings = sclient.users.getPendingFollows(profile.uid);
	});

	$: filtered = (pendings: TPendingFollow[]) => {
		return pendings.filter((pending) => pending.state == 'pending');
	};

	const refuse = async (pending_follow: TPendingFollow) => {
		const success = await sclient.users.refusePendingFollow(pending_follow.follower.uid);
		if (success) pending_follow.state = 'refused';
		else toast_store.trigger(toasts.error());
	};

	const accept = async (pending_follow: TPendingFollow) => {
		const success = await sclient.users.acceptPendingFollow(pending_follow.follower.uid);
		if (success) pending_follow.state = 'accepted';
		else toast_store.trigger(toasts.error());
	};
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await get_pendings}
		<Loading />
	{:then pendings}
		{#if pendings.length > 0}
			{#each filtered(pendings) as pending_follow}
				<ProfileCard {sclient} profile={pending_follow.follower}>
					<div>
						<button
							type="button"
							class="variant-ghost-error btn aspect-square p-2 hover:cursor-pointer"
							on:click={() => refuse(pending_follow)}
						>
							<Icon icon="mdi:minus" /></button
						>
						<button
							type="button"
							class="variant-ghost-primary btn aspect-square p-2 hover:cursor-pointer"
							on:click={() => accept(pending_follow)}
						>
							<Icon icon="mdi:check" /></button
						>
					</div>
				</ProfileCard>
			{/each}
		{:else}
			<p class="text-center text-lg">No Pending Follow</p>
		{/if}
	{/await}
</section>
