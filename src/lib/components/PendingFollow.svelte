<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import type { TPendingFollow } from '$types/pending_follow';
	import Avatar from '$comp/Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { toasts } from '$lib/toasts';

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
			<p>Wants to follow you</p>
		</div>
	</div>
	<div>
		<button
			type="button"
			class="variant-ghost-error btn hover:cursor-pointer"
			on:click={refuse}
			disabled={loading}
		>
			Refuse</button
		>
		<button
			type="button"
			class="variant-ghost-primary btn hover:cursor-pointer"
			on:click={accept}
			disabled={loading}
		>
			Accept</button
		>
	</div>
</article>
