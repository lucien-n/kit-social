<script lang="ts">
	import type { TNotification } from '$types/notification.type';

	export let notification: TNotification;

	const types: { [type: string]: string } = {
		follow_request: 'Follow Request',
		info: 'Info'
	};
</script>

<article>
	<section class="border-b-2 border-surface-700 p-2 text-lg font-semibold">
		<p>{types[notification.type]}</p>
		<p class="opacity-70">{notification.content}</p>
	</section>
</article>
