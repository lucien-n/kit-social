<script lang="ts">
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

{#if $profileStore}
	<section class="flex h-full justify-between gap-3 p-3">
		<a
			href="/p/{$profileStore.name}"
			class="flex h-full w-full gap-2 rounded-md p-2 transition-all duration-100 ease-in-out hover:bg-surface-600"
		>
			<div class="relative">
				<Avatar initials={$profileStore.name[0]} width="w-14" />
				<span
					class="variant-filled-success badge-icon absolute -bottom-0 -right-0 z-10 scale-[90%]"
				/>
			</div>
			<div>
				<p class="ml-1 text-xl font-semibold">
					{$profileStore.name}
				</p>
			</div>
		</a>
		<div class="flex h-full items-center justify-center">
			<a href="/auth/signout" aria-label="signout" data-sveltekit-reload
				><Icon icon="mdi:logout" width={32} /></a
			>
		</div>
	</section>
{/if}
