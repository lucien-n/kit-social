<script lang="ts">
	import Icon from '@iconify/svelte';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<section class="card flex h-full w-full flex-col">
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full"
	>
		<TabAnchor href="/settings/account">
			<svelte:fragment slot="lead">
				<Icon style="width: 100%; height: 100%;" icon="mdi:account-circle" />
			</svelte:fragment>
			Account
		</TabAnchor>
	</TabGroup>

	<section class="h-full w-full p-5">
		<slot />
	</section>
</section>
