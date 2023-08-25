<script lang="ts">
	// #==========[ START OF SKELETON SHANANIGANS ]==========#
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

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

	import Icon from '@iconify/svelte';
	import ProfileDropdown from '$comp/ProfileDropdown.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
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
			<svelte:fragment slot="trail">
				{#if session}
					<ProfileDropdown />
				{:else}
					<a href="/auth/signin" class="btn">Sign In</a>
					<a href="/auth/signup" class="btn">Sign Up</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
