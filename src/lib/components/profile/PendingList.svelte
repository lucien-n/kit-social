<script lang="ts">
	import type SocialClient from '$sclient/sclient';
	import type { TPendingFollow } from '$types/pending_follow';
	import Icon from '@iconify/svelte';
	import PendingFollow from './PendingFollow.svelte';
	import { fade } from 'svelte/transition';

	export let pending_follows: Promise<TPendingFollow[]>;
	export let sclient: SocialClient;

	$: filtered = (pendings: TPendingFollow[]) => {
		return pendings.filter((pending) => pending.state == 'pending');
	};
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
	{#await pending_follows}
		<div class="animate-spin">
			<span>
				<Icon icon="mdi:loading" style="width: 100%; height: 100%;" />
			</span>
		</div>
	{:then pendings}
		{#if pendings.length > 0}
			{#each filtered(pendings) as pending_follow}
				<PendingFollow
					{sclient}
					{pending_follow}
					on:state={({ detail }) => (pending_follow.state = detail)}
				/>
			{/each}
		{:else}
			<p class="text-center text-lg">No Pending Follow</p>
		{/if}
	{/await}
</section>
