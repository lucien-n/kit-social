<script lang="ts">
	import { getAvatar } from '$api/profiles';
	import type KClient from '$kclient/kclient';
	import type { PublicProfile } from '$types/public_profile.type';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let width = 'w-14';
	export let profile: PublicProfile | SupaProfile | null;
	export let kclient: KClient;

	const avatar = async () => {
		if (!profile) return;
		// TODO: Find a better solution than checking startsWith('http')
		if (profile.avatar_url && profile.avatar_url.startsWith('http')) return profile.avatar_url;
		else return await kclient.getAvatar(profile.uid);
	};
</script>

<div class={width}>
	{#if profile}
		{#await avatar()}
			<div
				class="flex {width} placeholder aspect-square h-fit animate-pulse items-center justify-center rounded-full bg-black bg-opacity-30"
			/>
		{:then avatar_url}
			{#if avatar_url}
				<img
					src={avatar_url}
					alt=""
					class="{width} placeholder h-fit rounded-full"
					class:animate-pulse={!avatar_url}
					loading="eager"
					width="96"
					height="96"
				/>
			{:else}
				<Avatar {width} initials={profile.name.slice(0, 1)} />
			{/if}
		{/await}
	{:else}
		<div class="relative">
			<div
				class="flex {width} placeholder aspect-square h-fit animate-pulse items-center justify-center rounded-full bg-black bg-opacity-30"
			/>
			<span class="absolute left-0 top-0 {width} p-2">
				<Icon icon="mdi:account" width="full" />
			</span>
		</div>
	{/if}
</div>
