<script lang="ts">
	export let data: { post: any };

	let { post } = data;

	console.log(post);
</script>

{#await post}
	<h1 class="h1">fetching post data</h1>
{:then post_data}
	<h1 class="h1">{post_data.content}</h1>
{/await}
