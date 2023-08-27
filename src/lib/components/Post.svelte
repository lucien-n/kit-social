<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { getProfile } from '$api/profiles';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { profilesStore } from '$stores/profiles';
	import type { PublicPost } from '$types/public_post.type';
	import type { PublicProfile } from '$types/public_profile.type';

	export let post: PublicPost;

	let postAuthor: PublicProfile | null;

	onMount(async () => {
		if (profilesStore.contains({ uid: post.author_uid })) {
			postAuthor = profilesStore.get({ uid: post.author_uid });
			return;
		}

		postAuthor = await getProfile({ uid: post.author_uid });
		if (postAuthor) profilesStore.add(postAuthor);
	});
</script>

<article class="card flex w-full flex-col p-2" in:fade={{ duration: 200 }}>
	<section class="flex gap-2">
		<div>
			{#if postAuthor}
				<Avatar initials={postAuthor.name[0]} width="w-12" />
			{:else}
				<div class="placeholder h-12 w-12 animate-pulse rounded-full" />
			{/if}
		</div>
		<div class="text-lg">
			<div class="flex gap-2">
				{#if postAuthor}
					<p class="font-bold">
						{postAuthor.name}
					</p>
				{:else}
					<span class="placeholder w-20 animate-pulse rounded" />
				{/if}
				<p class="opacity-70">
					{#if postAuthor}
						<a href="/u/{postAuthor.name}">
							@{postAuthor.name}
						</a>
					{:else}
						<span class="placeholder w-10 animate-pulse rounded" />
					{/if}
					·
					<a href="/u/{postAuthor?.name}/p/{post.uid}" class="hover:underline">
						{formatDate(new Date(post.created_at))}
					</a>
				</p>
			</div>
			<p>
				{post.content}
			</p>
		</div>
	</section>
</article>
