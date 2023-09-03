<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import type { TPendingFollow } from '$types/pending_follow';
	import Icon from '@iconify/svelte';
	import PendingFollow from './PendingFollow.svelte';

	export let pending_follows: Promise<TPendingFollow[]>;
	export let sclient: SocialClient;

	$: filtered = (pendings: TPendingFollow[]) => {
		return pendings.filter((pending) => pending.state == 'pending');
	};
</script>

<section class="h-full">
	{#await pending_follows}
		<div class="animate-spin">
			<span>
				<Icon icon="mdi:loading" style="width: 100%; height: 100%;" />
			</span>
		</div>
	{:then pendings}
		{#if pendings}
			{#each filtered(pendings) as pending_follow}
				<PendingFollow
					{sclient}
					{pending_follow}
					on:state={({ detail }) => (pending_follow.state = detail)}
				/>
			{/each}
		{:else}
			<h2 class="h2 text-center">No Pending Follow</h2>
		{/if}
	{/await}
</section>
