<script lang="ts">
	import { profileStore } from '$stores/profile';

	export let profile: SupaProfile;

	export const follow = async () => {
		// if ($profileStore?.uid == profile.uid) return;
		const res = await fetch(`/api/user/follow/${profile.uid}`);
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
