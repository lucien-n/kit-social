<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { TPublicProfile } from '$types/public_profile.type';
	import Avatar from '$comp/Avatar.svelte';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;
	export let profile: TPublicProfile;

	let is_online = false;
</script>

{#if profile.uid}
	<a href="/u/{profile.name}" class="flex h-fit justify-between gap-3">
		<article class="hover-bg flex h-full w-full gap-2">
			<div class="relative">
				<Avatar {sclient} {profile} />
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
