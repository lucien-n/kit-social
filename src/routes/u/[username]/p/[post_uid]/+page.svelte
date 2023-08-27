<script lang="ts">
	export let data: { error: string; post: any };

	let { error, post } = data;

	console.log(error, post);
</script>

<article class="flex h-full w-full flex-col items-center justify-center">
	{#if !error}
		{#await post}
			<h1 class="h1">fetching post data</h1>
		{:then post_data}
			<h1 class="h1">{post_data.content}</h1>
		{/await}
	{:else}
		<h1 class="h1">Post not found</h1>
	{/if}
</article>
