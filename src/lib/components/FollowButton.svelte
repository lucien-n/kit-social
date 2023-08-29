<script lang="ts">
	import { enhance } from '$app/forms';
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export let profile: PublicProfile;

	let followed: boolean;
	let loading = false;

	onMount(() => {
		profileStore.subscribe(async (currentProfile) => {
			if (!currentProfile) return;
			const res = await fetch(`/api/users/${currentProfile.uid}/is-following/${profile.uid}`);
			const data = await res.json();
			followed = data == true;
		});
	});

	export const toggleFollow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		loading = true;

		if (followed) {
			const res = await fetch(`/api/users/${profile.uid}/unfollow`);
			if (res.ok) followed = false;
		} else {
			const res = await fetch(`/api/users/${profile.uid}/follow`);
			if (res.ok) followed = true;
		}

		loading = false;
	};
</script>

<button
	class="variant-ghost-primary btn flex gap-1"
	disabled={loading}
	on:click={toggleFollow}
	name={followed ? 'Unfollow' : 'Follow'}
>
	{#if loading}
		<span class="animate-spin">
			<Icon icon="mdi:loading" />
		</span>
	{/if}

	{followed ? 'Unfollow' : 'Follow'}</button
>
