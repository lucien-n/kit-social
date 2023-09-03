<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import type { TPublicProfile } from '$types/public_profile.type';
	import Avatar from '$comp/Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { toasts } from '$lib/toasts';
	import { fly } from 'svelte/transition';

	export let sclient: SocialClient;
	export let profile: TPublicProfile;

	const dispatch = createEventDispatcher();
	const toast_store = getToastStore();

	const remove = async () => {
		const success = await sclient.users.removeFollower(profile.uid);
		if (success) dispatch('remove');
		else toast_store.trigger(toasts.error());
	};
</script>

<article
	out:fly={{ x: 200, duration: 100 }}
	class="hover-bg flex items-center justify-between gap-3"
>
	<div class="flex gap-3">
		<Avatar {sclient} {profile} />
		<div>
			<a href="/u/{profile.name}" class="text-lg font-semibold">{profile.name}</a>
			<p>{profile.is_private ? 'Private' : 'Public'}</p>
		</div>
	</div>
	<div>
		<button type="button" class="variant-ghost-warning btn hover:cursor-pointer" on:click={remove}>
			Remove</button
		>
	</div>
</article>
