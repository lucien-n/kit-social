<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-full w-full items-center justify-center">
	<h2 class="h2">
		{$page.status}: {$page.error?.message}
	</h2>
</div>
