<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { profilesStore } from '$stores/profiles';
	import Avatar from '$comp/Avatar.svelte';
	import type { PublicPost } from '$types/public_post.type';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;
	export let post: PublicPost;

	onMount(async () => {
		profilesStore.add(post.author);
	});
</script>

<article class="card flex w-full flex-col p-2" in:fade={{ duration: 200 }}>
	<section class="flex gap-2">
		<div>
			{#if post.author}
				<Avatar {sclient} profile={post.author} width="w-14" />
			{:else}
				<div class="placeholder h-12 w-12 animate-pulse rounded-full" />
			{/if}
		</div>
		<div class="text-lg">
			<div class="flex gap-2">
				{#if post.author}
					<p class="font-bold">
						{post.author.name}
					</p>
				{:else}
					<span class="placeholder w-20 animate-pulse rounded" />
				{/if}
				<p class="opacity-70">
					{#if post.author}
						<a href="/u/{post.author.name}">
							@{post.author.name}
						</a>
					{:else}
						<span class="placeholder w-10 animate-pulse rounded" />
					{/if}
					·
					<a href="/u/{post.author.name}/p/{post.uid}" class="hover:underline">
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
