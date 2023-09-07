<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/utilities/toasts';
	import type SocialClient from '$sclient/sclient';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let sclient: SocialClient;
	export let profile: TProfile;

	const unfollowPrivateModal: ModalSettings = {
		type: 'confirm',
		body: '<strong>This profile is private.</strong><br/> If you unfollow them, you will need to ask to follow them again.'
	};

	const toast_store = getToastStore();
	const modal_store = getModalStore();

	const dispatch = createEventDispatcher();

	let followed: boolean = profile.is_followed || false;
	let loading = false;

	export const toggleFollow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		loading = true;

		if (followed && profile.is_private) {
			const confirm = await new Promise<boolean>((resolve) => {
				if (!browser) return;
				modal_store.trigger({ ...unfollowPrivateModal, response: (r: boolean) => resolve(r) });
			});
			if (!confirm) {
				loading = false;
				return;
			}
		}

		const { status, error } = await (followed
			? sclient.users.unfollow(profile.uid)
			: sclient.users.follow(profile.uid));

		if (status) {
			followed = !followed;
			toast_store.trigger(toasts.info(status));
		}

		if (error) toast_store.trigger(toasts.error(error));

		if (followed) dispatch('follow');
		else dispatch('unfollow');
		dispatch('update');

		loading = false;

		goto('?', { replaceState: true, invalidateAll: true });
	};

	const getButtonText = () => {
		if (profile.is_pending) return 'Pending';
		return followed
			? 'Unfollow'
			: profile.is_private && !profile.is_followed
			? 'Ask to Follow'
			: 'Follow';
	};
</script>

{#if $profileStore?.uid != profile.uid}
	<button
		class="variant-ghost-primary btn flex gap-1"
		disabled={loading || profile.is_pending}
		on:click={toggleFollow}
		name="follow-state"
	>
		{#if loading}
			<span class="animate-spin">
				<Icon icon="mdi:loading" />
			</span>
		{/if}
		{#key followed}
			{getButtonText()}
		{/key}
	</button>
{/if}
