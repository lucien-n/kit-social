<script lang="ts">
	import Icon from '@iconify/svelte';

	export let opened: boolean = true;

	const toggle = (): void => {
		opened = !opened;
	};
</script>

<button class="variant-glass-surface btn" on:click={toggle}>
	<Icon icon="mdi-light:account" width={32} />
</button>

{#if opened}
	<div class="absolute right-0 top-16 w-48">
		<section class="card">
			<p class="p-3">hello</p>
			<hr />
			<a href="/auth/signout" class="variant-glass-surface btn w-full">Sign Out</a>
		</section>
	</div>
{/if}
