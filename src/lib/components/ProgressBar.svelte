<script lang="ts">
	import { navigating } from '$app/stores';
	import { slide } from 'svelte/transition';
</script>

{#if $navigating}
	<div
		transition:slide={{ duration: 200 }}
		id="loading-bar"
		class="absolute h-2 w-full bg-success-500 shadow-sm shadow-success-500"
	/>
{/if}
