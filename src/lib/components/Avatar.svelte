<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let width = 'w-14';
	export let profile: TProfile | SupaProfile | null;
	export let sclient: SocialClient;

	const avatar = async () => {
		if (!profile) return;
		// TODO: Find a better solution than checking startsWith('http')
		if (profile.avatar_url && profile.avatar_url.startsWith('http')) return profile.avatar_url;
		else return await sclient.users.getAvatar(profile.uid);
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
				<Icon icon="mdi:account" style="width: 100%; height: 100%;" />
			</span>
		</div>
	{/if}
</div>
