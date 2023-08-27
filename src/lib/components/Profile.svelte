<script lang="ts">
	import { profileStore } from '$stores/profile';
	import type { PublicProfile } from '$types/public_profile.type';

	export let profile: PublicProfile;

	export const follow = async () => {
		if ($profileStore?.uid == profile.uid) return;
		const res = await fetch(`/api/users/${profile.uid}/follow`);
		console.log(res);
	};
</script>

<article
	id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
	class="flex h-full w-full flex-col items-center justify-center"
>
	<h1>{Object.values(profile)}</h1>
	<button class="variant-ghost-primary btn" on:click={follow}>Follow</button>
</article>
