<script lang="ts">
	const w = Math.floor(Math.random() * 5);
</script>

<div class="card flex w-full gap-2 p-2">
	<div class="placeholder h-12 w-12 animate-pulse rounded-full" />
	<div class="flex w-full flex-col gap-2 text-lg">
		<div class="flex gap-3">
			<div class="placeholder h-5 w-20 animate-pulse rounded" />
			<div class="placeholder h-5 w-16 animate-pulse rounded" />
		</div>
		{#if w == 0}
			<div class="placeholder h-5 w-[30%] animate-pulse rounded" />
		{:else if w == 1}
			<div class="placeholder h-5 w-[50%] animate-pulse rounded" />
		{:else if w == 2}
			<div class="placeholder h-5 w-[60%] animate-pulse rounded" />
		{:else if w == 3}
			<div class="placeholder h-5 w-[80%] animate-pulse rounded" />
		{:else if w == 4}
			<div class="placeholder h-5 w-[90%] animate-pulse rounded" />
		{/if}
	</div>
</div>
