<script lang="ts">
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import Avatar from '$comp/Avatar.svelte';
	import type { TPublicProfile } from '$types/public_profile.type';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;

	let public_profile: TPublicProfile;

	profileStore.subscribe((profile) => (public_profile = { ...profile } as TPublicProfile));
</script>

{#if $profileStore}
	<section class="flex h-full justify-between gap-3">
		<a href="/u/{$profileStore.name}" class="hover-bg flex h-full w-full gap-2">
			<div class="relative">
				<Avatar {sclient} bind:profile={public_profile} />
				<span
					class="variant-filled-success badge-icon absolute -bottom-0 -right-0 z-10 scale-[90%]"
				/>
			</div>
			<div>
				<p class="ml-1 text-lg font-semibold">
					{$profileStore.name}
				</p>
			</div>
		</a>
		<div class="flex h-full items-center justify-center gap-2">
			<a href="/settings/account" class="btn border-0 p-1" aria-label="settings">
				<Icon icon="mdi:settings" width={24} />
			</a>
		</div>
	</section>
{/if}
