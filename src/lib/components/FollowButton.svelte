<script lang="ts">
	import { goto } from '$app/navigation';
	import { modals } from '$lib/utilities/modals';
	import { toasts } from '$lib/utilities/toasts';
	import type SocialClient from '$sclient/sclient';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import {  getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let sclient: SocialClient
	export let profile: TProfile;

	const unfollowPrivateModal: ModalSettings = {
           type: 'confirm',
           body: '<strong>This profile is private.</strong><br/> If you unfollow them, you will need to ask to follow them again.',
	}

	const toastStore = getToastStore();

	const dispatch = createEventDispatcher();

	let followed: boolean = profile.is_followed || false;
	let loading = false;

	export const toggleFollow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		loading = true;

		if (followed && profile.is_private) {
			const confirm = await modals.confirm(unfollowPrivateModal);
			if (!confirm) {
				loading = false;
				return;
			}
		}

		const {success, error} = await (followed 
			? sclient.users.unfollow(profile.uid) 
			: sclient.users.follow(profile.uid))

		if (success) {
			followed = !followed
		}

		if (error)
			toastStore.trigger(toasts.error(error));

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
		name={getButtonText()}
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
