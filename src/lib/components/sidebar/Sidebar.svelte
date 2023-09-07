<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type SocialClient from '$sclient/sclient';
	import FollowedList from '$comp/sidebar/FollowedList.svelte';
	import FollowerList from '$comp/sidebar/FollowerList.svelte';
	import PendingList from '$comp/sidebar/PendingList.svelte';

	export let sclient: SocialClient;

	let tabSet: number = 0;
</script>

<TabGroup justify="justify-center" border="border-0" rounded="rounded-none" regionPanel="p-2">
	<Tab bind:group={tabSet} name="followed" value={0} regionTab="text-center">
		<p class="text-base">Followed</p>
	</Tab>
	<Tab bind:group={tabSet} name="followers" value={1} regionTab="text-center">
		<p class="text-base">Followers</p>
	</Tab>
	<Tab bind:group={tabSet} name="pending" value={2} regionTab="text-center">
		<p class="text-base">Pending</p>
	</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet == 0}
			<FollowedList {sclient} />
		{:else if tabSet == 1}
			<FollowerList {sclient} />
		{:else}
			<PendingList {sclient} />
		{/if}
	</svelte:fragment>
</TabGroup>
