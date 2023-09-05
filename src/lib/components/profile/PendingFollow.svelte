<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Avatar from '$comp/Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { toasts } from '$lib/utilities/toasts';
	import Icon from '@iconify/svelte';

	export let sclient: SocialClient;
	export let pending_follow: TPendingFollow;

	const dispatch = createEventDispatcher();
	const toast_store = getToastStore();

	let loading = false;

	const refuse = async () => {
		loading = true;
		const success = await sclient.users.refusePendingFollow(pending_follow.follower.uid);
		if (success) dispatch('state', 'refused');
		else toast_store.trigger(toasts.error());
		loading = false;
	};

	const accept = async () => {
		loading = true;
		const success = await sclient.users.acceptPendingFollow(pending_follow.follower.uid);
		if (success) dispatch('state', 'accepted');
		else toast_store.trigger(toasts.error());
		loading = false;
	};
</script>

<article
	out:fly={{ x: 200, duration: 100 }}
	class="hover-bg flex items-center justify-between gap-3"
>
	<div class="flex gap-3">
		<Avatar {sclient} profile={pending_follow.follower} />
		<div>
			<p class="text-lg font-semibold">{pending_follow.follower.name}</p>
			<button
				type="button"
				class="variant-ghost-error btn aspect-square p-2 hover:cursor-pointer"
				on:click={refuse}
				disabled={loading}
			>
				<Icon icon="mdi:minus" /></button
			>
			<button
				type="button"
				class="variant-ghost-primary btn aspect-square p-2 hover:cursor-pointer"
				on:click={accept}
				disabled={loading}
			>
				<Icon icon="mdi:check" /></button
			>
		</div>
	</div>
</article>
