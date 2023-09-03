<script lang="ts">
	import CreatePost from '$comp/CreatePost.svelte';
	import Post from '$comp/Post.svelte';
	import PostPlaceholder from '$comp/PostPlaceholder.svelte';
	import type SocialClient from '$sclient/sclient.js';
	import type { TPublicPost } from '$types/public_post.type.js';

	export let data: { sclient: SocialClient; streamed: { posts: TPublicPost[] } };
	export let form;

	let {
		sclient,
		streamed: { posts }
	} = data;
	$: ({
		sclient,
		streamed: { posts }
	} = data);
</script>

<svelte:head>
	<title>Social - Home</title>
</svelte:head>

<div class="flex w-full flex-col gap-3">
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
	<CreatePost {sclient} {form} />
	<hr />
	{#await posts}
		{#each { length: 10 } as _}
			<PostPlaceholder />
		{/each}
	{:then posts}
		{#if posts && posts.length > 0}
			<section id="posts" class="flex flex-col gap-3">
				{#each posts as post}
					<Post {sclient} {post} />
				{/each}
			</section>
		{:else}
			<h1 class="h1 w-full text-center">No post found</h1>
		{/if}
	{:catch}
		<h1 class="h1">An error occured</h1>
	{/await}
</div>
