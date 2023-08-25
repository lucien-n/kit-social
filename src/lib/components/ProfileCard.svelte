<script lang="ts">
	import { profileStore } from '$stores/profile';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

{#if $profileStore}
	<Avatar initials={$profileStore.name[0]} />
	<h1>
		{$profileStore.name}
	</h1>
{/if}
