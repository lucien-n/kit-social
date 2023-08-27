<script lang="ts">
	import Profile from '$comp/Profile.svelte';
	import { getProfile } from '$supa/profiles';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: { supabase: SupabaseClient; username: string };

	let { supabase, username } = data;
</script>

<section class="flex h-full w-full items-center justify-center">
	{#await getProfile({ supabase, match: { name: username } })}
		<h1 class="h1">Fetching profile</h1>
	{:then profile}
		{#if profile}
			<Profile {profile} />
		{:else}
			<h1 class="h1">Profile not found</h1>
		{/if}
	{/await}
</section>
