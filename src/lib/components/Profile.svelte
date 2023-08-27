<script lang="ts">
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let profile: PublicProfile;

	let followed: boolean;

	export const toggleFollow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		if (followed) {
			const res = await fetch(`/api/users/${profile.uid}/unfollow`);
			if (res.ok) followed = false;
		} else {
			const res = await fetch(`/api/users/${profile.uid}/follow`);
			if (res.ok) followed = true;
		}
	};

	profileStore.subscribe(async (currentProfile) => {
		if (!currentProfile) return;
		const res = await fetch(`/api/users/${currentProfile.uid}/is-following/${profile.uid}`);
		const data = await res.json();
		console.log(data);
		followed = data == true;
	});
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
			<button class="variant-ghost-primary btn" on:click={toggleFollow}
				>{followed ? 'Unfollow' : 'Follow'}</button
			>
		</section>
		<section class="p-3" />
	</article>
</div>
