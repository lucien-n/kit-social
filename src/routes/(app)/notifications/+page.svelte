<script lang="ts">
	import Notification from '$comp/Notification.svelte';
	import type { TNotification } from '$types/notification.type';

	export let data: { streamed: { notifications: Promise<TNotification[] | null> } };

	let {
		streamed: { notifications }
	} = data;
	$: ({
		streamed: { notifications }
	} = data);
</script>

{#await notifications then notifications}
	{#if notifications}
		{#each notifications as notification}
			<Notification {notification} />
		{/each}
	{:else}
		<p>no notifications</p>
	{/if}
{/await}
