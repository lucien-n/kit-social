<script lang="ts">
	import { onMount } from 'svelte';

	export let data: { error: string; post_uid: string };

	let { error, post_uid } = data;

	const getPost = async () => {
		const res = await fetch(`/api/posts/${post_uid}`);
		const data = await res.json();

		return data;
	};

	onMount(() => {
		getPost();
	});
</script>

<article class="flex h-full w-full flex-col items-center justify-center">
	{#if !error}
		{#await getPost()}
			<h1 class="h1">fetching post data</h1>
		{:then post}
			<h1 class="h1">{post.content}</h1>
		{/await}
	{:else}
		<h1 class="h1">Post not found</h1>
	{/if}
</article>
