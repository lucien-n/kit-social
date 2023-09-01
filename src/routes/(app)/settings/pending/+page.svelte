<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PendingFollow } from '$types/pending_follow';
	import Icon from '@iconify/svelte';
	import type { Session } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: { session: Session; streamed: { pending_follows: PendingFollow[] } };

	let {
		session,
		streamed: { pending_follows }
	} = data;
	$: ({
		session,
		streamed: { pending_follows }
	} = data);

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form method="post" use:enhance={handleSubmit} class="h-full">
	<section class="h-full">
		{#await pending_follows}
			<span class="animate-spin">
				<Icon icon="mdi:loading" />
			</span>
		{:then pending_follows}
			{#if pending_follows}
				{#each pending_follows as pending_follow}
					<article>
						<p>{pending_follow}</p>
					</article>
				{/each}
			{:else}
				<h2 class="h2 text-center">No Pending Follow</h2>
			{/if}
		{/await}
	</section>
</form>
