<script lang="ts">
	import type { TNotification } from '$types/notification.type';

	export let notification: TNotification;
</script>

<article>
	<section class="text-lg font-semibold">
		<p>{notification.type}</p>
		<p class="opacity-70">{notification.content}</p>
	</section>
</article>
