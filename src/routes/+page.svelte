<script lang="ts">
	import CreatePost from '$comp/CreatePost.svelte';
	import Post from '$comp/Post.svelte';
	import { getPosts } from '$supa/posts';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: { supabase: SupabaseClient };
	export let form;

	let { supabase } = data;
</script>

<div class="container mx-auto flex w-full flex-col">
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
	<CreatePost {form} />
	{#await getPosts({ supabase, match: {} })}
		<h1 class="h1 w-full text-center">Fetching posts</h1>
	{:then posts}
		{#if posts && posts.length > 0}
			{#each posts as post}
				<Post {post} />
			{/each}
		{:else}
			<h1 class="h1 w-full text-center">No post found</h1>
		{/if}
	{/await}
</div>
