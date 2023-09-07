<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { error, post_uid } = data;

	const getPost = async () => {
		const res = await fetch(`/api/posts/${post_uid}`);
		const data = await res.json();

		return data;
	};
</script>

<article class="flex h-full w-full flex-col items-center justify-center">
	{#if !error}
		{#await getPost()}
			<span class="animate-spin">
				<Icon icon="mdi:loading" width={100} />
			</span>
		{:then post}
			<h1 class="h1">{post.content}</h1>
		{/await}
	{:else}
		<h1 class="h1">Post not found</h1>
	{/if}
</article>
