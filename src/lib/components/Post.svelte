<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { getProfile } from '$supa/profiles';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let post: SupaPost;

	let postAuthor: SupaProfile | null;
</script>

<section class="card flex w-full flex-col p-2">
	{#await getProfile({ supabase, match: { uid: post.author_uid } }) then author}
		{#if author}
			<section class="flex gap-2">
				<div>
					<Avatar initials={postAuthor?.name[0]} width="w-12" />
				</div>
				<div class="text-lg">
					<div class="flex gap-2">
						<p class=" font-bold">
							{author.name}
						</p>
						<p class="opacity-70">
							<a href="/u/{author.name}">
								@{author.name}
							</a>
							·
							<a href="/p/{post.uid}" class="hover:underline">
								{formatDate(new Date(post.created_at || 0).getTime())}
							</a>
						</p>
					</div>
					<p>{post.content}</p>
				</div>
			</section>
		{:else}
			<p>error</p>
		{/if}
	{/await}
</section>
