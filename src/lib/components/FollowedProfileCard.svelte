<script lang="ts">
	import { isOnline } from '$api/profiles';
	import { formatDate } from '$lib/utils';
	import type { PublicProfile } from '$types/public_profile.type';
	import { onMount } from 'svelte';
	import Avatar from '$comp/Avatar.svelte';

	export let profile: PublicProfile;

	let is_online = false;

	onMount(async () => {
		is_online = await isOnline(profile.uid);
	});
</script>

{#if profile.uid}
	<a href="/u/{profile.name}" class="flex h-fit justify-between gap-3 p-3">
		<article
			class="flex h-full w-full gap-2 rounded-md p-2 transition-all duration-100 ease-in-out hover:bg-surface-600"
		>
			<div class="relative">
				<Avatar {profile} />
				{#if is_online}
					<span
						class="variant-filled-success badge-icon absolute -bottom-0 -right-0 z-10 scale-[90%]"
					/>
				{/if}
			</div>
			<div>
				<p class="ml-1 text-lg font-semibold">
					{profile.name}
				</p>
				<p class="italic opacity-70">
					{is_online ? 'Online' : `Last seen: ${formatDate(profile.last_seen)}`}
				</p>
			</div>
		</article>
	</a>
{/if}
