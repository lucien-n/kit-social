<script lang="ts">
	import Profile from '$comp/Profile.svelte';
	import type { PublicProfile } from '$types/public_profile.type';
	import Icon from '@iconify/svelte';

	export let data: { error: string; username: string };

	let { error, username } = data;

	const getProfile = async () => {
		// TODO: fetch by uid
		const res = await fetch(`/api/users/${username}/profile`);
		if (!res.ok) throw 'Internal Error';

		const data = await res.json();

		const profile = data as PublicProfile;

		return profile;
	};
</script>

<section class="flex h-full w-full items-center justify-center">
	{#if error}
		<h1 class="h1">{error}</h1>
	{:else}
		{#await getProfile()}
			<span class="animate-spin">
				<Icon icon="mdi:loading" width={100} />
			</span>
		{:then profile}
			{#if profile}
				<Profile {profile} />
			{:else}
				<h1 class="h1">Profile not found</h1>
			{/if}
		{:catch e}
			<h1 class="h1">{e}</h1>
		{/await}
	{/if}
</section>
