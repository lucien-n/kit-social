<script lang="ts">
	import { enhance } from '$app/forms';
	import Avatar from '$comp/Avatar.svelte';
	import type SocialClient from '$sclient/sclient';
	import type { PendingFollow } from '$types/pending_follow';
	import Icon from '@iconify/svelte';
	import type { Session } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: {
		session: Session;
		sclient: SocialClient;
		streamed: { pending_follows: PendingFollow[] };
	};

	let {
		session,
		sclient,
		streamed: { pending_follows }
	} = data;
	$: ({
		session,
		sclient,
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
				<Icon icon="mdi:loading" style="width: 100%; height: 100%;" />
			</span>
		{:then pending_follows}
			{#if pending_follows}
				{#each pending_follows as pending_follow}
					<article class="flex gap-3">
						<input type="text" disabled hidden name="uid" value={pending_follow.follower.uid} />
						<Avatar {sclient} profile={pending_follow.follower} />
						<div>
							<p class="text-lg">Wants to follow you</p>
							<input
								disabled={loading}
								type="submit"
								class="variant-ghost-error btn-sm hover:cursor-pointer"
								value="Refuse"
								name="refuse"
							/>
							<input
								disabled={loading}
								type="submit"
								class="variant-ghost-primary btn-sm hover:cursor-pointer"
								value="Accept"
								name="accept"
							/>
						</div>
					</article>
				{/each}
			{:else}
				<h2 class="h2 text-center">No Pending Follow</h2>
			{/if}
		{/await}
	</section>
</form>
