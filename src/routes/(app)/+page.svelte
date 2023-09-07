<script lang="ts">
	import CreatePost from '$comp/post/CreatePost.svelte';
	import Post from '$comp/post/Post.svelte';
	import PostPlaceholder from '$comp/post/PostPlaceholder.svelte';
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData & PageData;

	let {
		sclient,
		streamed: { posts },
		form
	} = data;
	$: ({
		sclient,
		streamed: { posts },
		form
	} = data);
</script>

<div class="flex w-full flex-col gap-3">
	<CreatePost {sclient} form_data={form} />
	<section id="posts" class="flex flex-col gap-3">
		{#await posts}
			{#each { length: 10 } as _}
				<PostPlaceholder />
			{/each}
		{:then posts}
			{#if posts && posts.length > 0}
				{#each posts as post}
					<Post {sclient} {post} />
				{/each}
			{:else}
				<h1 class="h1 w-full text-center">No post found</h1>
			{/if}
		{:catch}
			<h1 class="h1">An error occured</h1>
		{/await}
	</section>
</div>
