<script lang="ts">
	import { goto } from '$app/navigation';
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';
	import Icon from '@iconify/svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let profile: PublicProfile;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const dispatch = createEventDispatcher();

	let followed: boolean = profile.is_followed || false;
	let loading = false;

	export const toggleFollow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		loading = true;

		if (followed && profile.is_private) {
			const confirm = await new Promise<boolean>((resolve) => {
				modalStore.trigger({
					type: 'confirm',
					body: '<strong>This profile is private.</strong><br/> If you unfollow them, you will need to ask to follow them again.',
					response: (r: boolean) => resolve(r)
				});
			});

			if (!confirm) {
				loading = false;
				return;
			}
		}

		let message = '';

		const res = await fetch(`/api/users/${profile.uid}/follow`, {
			method: followed ? 'DELETE' : 'GET'
		});

		if (res.ok) {
			followed = !followed;
			try {
				const data = await res.json();
				console.log(data);
				message = data.message;
			} catch (_) {}
		}

		if (message)
			toastStore.trigger({
				autohide: true,
				message
			});

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
