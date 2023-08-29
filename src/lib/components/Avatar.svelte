<script lang="ts">
	import { getAvatar } from '$api/profiles';
	import type { PublicProfile } from '$types/public_profile.type';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let width = 'w-14';
	export let profile: PublicProfile | SupaProfile | null;
</script>

<div class={width}>
	{#if profile}
		{#await getAvatar(profile.uid)}
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
		<div
			class="flex {width} placeholder aspect-square h-fit animate-pulse items-center justify-center rounded-full bg-black bg-opacity-30"
		/>
	{/if}
</div>
