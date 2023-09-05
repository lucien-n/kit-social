<script lang="ts">
	import { formatDatePrecise } from '$lib/utilities/methods';
	import Avatar from '$comp/Avatar.svelte';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;
	export let post: TPost;
</script>

<article class="card flex w-full flex-col p-2">
	<section class="flex gap-2">
		<div>
			<Avatar {sclient} profile={post.author} width="w-14" />
		</div>
		<div class="text-lg">
			<div class="flex gap-2">
				{post.author.name}
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
						{formatDatePrecise(new Date(post.created_at))}
					</a>
				</p>
			</div>
			<p>
				{post.content}
			</p>
		</div>
	</section>
</article>
