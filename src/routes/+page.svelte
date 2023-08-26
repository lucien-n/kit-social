<script lang="ts">
	import CreatePost from '$comp/CreatePost.svelte';
	import Post from '$comp/Post.svelte';
	import PostPlaceholder from '$comp/PostPlaceholder.svelte';
	import { getPosts } from '$supa/posts';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: { supabase: SupabaseClient };
	export let form;

	let { supabase } = data;

	function wait(milliseconds: number) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}
</script>

<div class="container mx-auto flex w-2/3 flex-col gap-3">
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
	<CreatePost {form} />
	<hr />
	{#await getPosts({ supabase, match: {} })}
		{#each { length: 10 } as _}
			<PostPlaceholder />
		{/each}
	{:then posts}
		{#if posts && posts.length > 0}
			<section id="posts" class="flex flex-col gap-3">
				{#each posts as post}
					<Post {supabase} {post} />
				{/each}
			</section>
		{:else}
			<h1 class="h1 w-full text-center">No post found</h1>
		{/if}
	{/await}
</div>
