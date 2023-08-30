<script lang="ts">
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import Avatar from '$comp/Avatar.svelte';
	import type { PublicProfile } from '$types/public_profile.type';

	export let notifications_amount: Promise<number | null>;

	let public_profile: PublicProfile;

	profileStore.subscribe((profile) => (public_profile = { ...profile } as PublicProfile));
</script>

{#if $profileStore}
	<section class="flex h-full justify-between gap-3 p-3">
		<a
			href="/u/{$profileStore.name}"
			class="flex h-full w-full gap-2 rounded-md p-2 transition-all duration-100 ease-in-out hover:bg-surface-600"
		>
			<div class="relative">
				<Avatar bind:profile={public_profile} />
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
			<a href="/notifications" class="btn border-0 p-1" aria-label="notifications">
				<span class="relative">
					<Icon icon="mdi:bell" width={24} />
					{#await notifications_amount then amount}
						{#if amount && amount > 0}
							<div class="badge absolute -right-[.6rem] -top-[.7rem] scale-90 bg-red-600">
								<p>{amount || 0}</p>
							</div>
						{/if}
					{/await}
				</span>
			</a>
			<a href="/settings/account" class="btn border-0 p-1" aria-label="settings">
				<Icon icon="mdi:settings" width={24} />
			</a>
		</div>
	</section>
{/if}
