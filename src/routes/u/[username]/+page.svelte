<script lang="ts">
	import { getProfile } from '$supa/profiles';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: { supabase: SupabaseClient; username: string };

	let { supabase, username } = data;

	console.log(getProfile);
</script>

<section class="flex h-full w-full items-center justify-center">
	{#await getProfile({ supabase, match: { name: username } })}
		<h1 class="h1">Fetching profile</h1>
	{:then profile}
		{#if profile}
			<h1 class="h1">{profile.name}</h1>
		{:else}
			<h1 class="h1">Profile not found</h1>
		{/if}
	{/await}
</section>
