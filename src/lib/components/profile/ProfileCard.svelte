<script lang="ts">
	import Avatar from '$comp/Avatar.svelte';
	import type SocialClient from '$sclient/sclient';

	export let sclient: SocialClient;
	export let profile: TProfile;

	let is_online = false;

	const P = {
		is_online
	};
</script>

<a href="/u/{profile.name}" class="hover-bg flex h-full w-full gap-2">
	<div class="relative">
		<Avatar {sclient} {profile} />
		<span class="variant-filled-success badge-icon absolute -bottom-0 -right-0 z-10 scale-[90%]" />
	</div>
	<div>
		<p class="ml-1 text-lg font-semibold">
			{profile.name}
		</p>
		<slot {P} />
	</div>
</a>
