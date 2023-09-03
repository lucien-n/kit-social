<script lang="ts">
	import Loading from '$comp/Loading.svelte';
	import type SocialClient from '$sclient/sclient';
	import type { TPublicProfile } from '$types/public_profile.type';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: { sclient: SocialClient; streamed: { followers: Promise<TPublicProfile[]> } };

	let {
		sclient,
		streamed: { followers }
	} = data;
</script>

<section>
	{#await followers}
		<Loading />
	{:then profiles}
		{#if profiles}
			{#each profiles as profile}
				<article class="hover-bg flex items-center justify-between gap-3">
					<div class="flex gap-3">
						<Avatar {sclient} {profile} />
						<div>
							<p class="text-lg font-semibold">{profile.name}</p>
							<p>{profile.is_private ? 'Private' : 'Public'}</p>
						</div>
					</div>
					<div>
						<button type="button" class="variant-ghost-warning btn hover:cursor-pointer">
							Remove</button
						>
					</div>
				</article>
			{/each}
		{/if}
	{/await}
</section>
