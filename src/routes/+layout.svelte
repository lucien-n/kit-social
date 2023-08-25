<script lang="ts">
	// #==========[ START OF SKELETON SHANANIGANS ]==========#
	import '../app.postcss';
	import { AppShell, AppBar, AppRail } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// #==========[ END OF SKELETON SHANANIGANS ]==========#

	import ProfileCard from '$comp/ProfileCard.svelte';
	import { profileStore } from '$stores/profile';
	import { getProfile } from '$supa/profiles';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}

			if (session) profileStore.set(await getProfile({ supabase, uid: session.user.id }));
			else profileStore.set(null);
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="p-0" gap="gap-0" spacing="space-x-0">
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">Social</strong>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<AppRail width="w-72">
			<svelte:fragment slot="trail">
				{#if session}
					<ProfileCard />
				{:else}
					<a href="/auth/signin" class="btn">Sign In</a>
					<a href="/auth/signup" class="btn">Sign Up</a>
				{/if}
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
