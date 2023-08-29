<script lang="ts">
	import { getProfile } from '$api/profiles';
	import Profile from '$comp/Profile.svelte';
	import Icon from '@iconify/svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: { supabase: SupabaseClient; error: string; username: string };

	let { supabase, error, username } = data;
	$: ({ supabase, username } = data);
</script>

<section class="flex h-full w-full items-center justify-center">
	{#if error}
		<h1 class="h1">{error}</h1>
	{:else}
		{#await getProfile({ username })}
			<span class="animate-spin">
				<Icon icon="mdi:loading" width={100} />
			</span>
		{:then profile}
			{#if profile}
				<Profile {profile} {supabase} />
			{:else}
				<h1 class="h1">Profile not found</h1>
			{/if}
		{:catch e}
			<h1 class="h1">{e}</h1>
		{/await}
	{/if}
</section>
