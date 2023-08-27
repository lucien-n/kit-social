<script lang="ts">
	import type { PublicProfile } from '$types/public_profile.type';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let profile: PublicProfile;
</script>

{#if profile.uid}
	<a href="/u/{profile.name}" class="flex h-fit justify-between gap-3 p-3">
		<section
			class="flex h-full w-full gap-2 rounded-md p-2 transition-all duration-100 ease-in-out hover:bg-surface-600"
		>
			<Avatar initials={profile.name[0]} width="w-12" />
			<div>
				<p class="ml-1 text-lg font-semibold">
					{profile.name}
				</p>
			</div>
		</section>
	</a>
{/if}
