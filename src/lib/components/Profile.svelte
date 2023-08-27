<script lang="ts">
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let profile: PublicProfile;

	let followed: boolean;

	export const follow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		const res = await fetch(`/api/users/${profile.uid}/follow`);
		console.log(res);
	};

	export const isFollowed = async () => {
		const res = 
	}
</script>

<div
	id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
	class="flex h-full w-full flex-col items-center justify-center"
>
	<article class="card h-4/5 w-4/5 rounded-tl-container-token rounded-tr-container-token">
		<section
			class="flex h-1/4 items-center justify-between bg-surface-900 p-5 rounded-tl-container-token rounded-tr-container-token"
		>
			<div class="flex items-center gap-4">
				<Avatar initials={profile.name[0]} width="w-24" />
				<div>
					<h2 class="h2">{profile.name}</h2>
				</div>
			</div>
			<button class="variant-ghost-primary btn" on:click={follow}>Follow</button>
		</section>
		<section class="p-3" />
	</article>
</div>
