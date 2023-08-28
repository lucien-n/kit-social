<script lang="ts">
	import CreatePost from '$comp/CreatePost.svelte';
	import Post from '$comp/Post.svelte';
	import PostPlaceholder from '$comp/PostPlaceholder.svelte';
	import type { PublicPost } from '$types/public_post.type.js';
	import type { RealtimeChannel, Session, SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';

	export let data: { supabase: SupabaseClient; session: Session };
	export let form;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	const getPosts = async () => {
		const res = await fetch('/api/posts/get-feed');
		if (!res.ok) throw 'Internal Error';

		const data = await res.json();

		const posts = data as PublicPost[];

		return posts;
	};
</script>

<div class="container mx-auto flex w-2/3 flex-col gap-3">
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
	<CreatePost {form} />
	<hr />
	{#await getPosts()}
		{#each { length: 10 } as _}
			<PostPlaceholder />
		{/each}
	{:then posts}
		{#if posts && posts.length > 0}
			<section id="posts" class="flex flex-col gap-3">
				{#each posts as post}
					<Post {post} />
				{/each}
			</section>
		{:else}
			<h1 class="h1 w-full text-center">No post found</h1>
		{/if}
	{:catch}
		<h1 class="h1">An error occured</h1>
	{/await}
</div>
