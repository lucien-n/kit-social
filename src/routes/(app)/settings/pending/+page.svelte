<script lang="ts">
	import { goto } from '$app/navigation';
	import PendingFollow from '$comp/PendingFollow.svelte';
	import type SocialClient from '$sclient/sclient';
	import type { TPendingFollow } from '$types/pending_follow';
	import Icon from '@iconify/svelte';

	export let data: {
		sclient: SocialClient;
		streamed: { pending_follows: Promise<TPendingFollow[]> };
	};

	let {
		sclient,
		streamed: { pending_follows }
	} = data;
	$: ({
		sclient,
		streamed: { pending_follows }
	} = data);

	$: filtered = (pendings: TPendingFollow[]) => {
		return pendings.filter((pending) => !pending.accepted);
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
					on:success={({ detail }) => (pending_follow.accepted = detail)}
				/>
			{/each}
		{:else}
			<h2 class="h2 text-center">No Pending Follow</h2>
		{/if}
	{/await}
</section>
