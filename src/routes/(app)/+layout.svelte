<script lang="ts">
	// #==========[ START OF SKELETON SHANANIGANS ]==========#
	import '../../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	// #==========[ END OF SKELETON SHANANIGANS ]==========#

	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import SignInUp from '$comp/SignInUp.svelte';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';
	import { titleStore } from '$stores/title';
	import { AppShell, AppRail, Modal, initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { setTitle } from '$lib/utilities/main';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ProgressBar from '$comp/ProgressBar.svelte';
	import twSplashImage from '$lib/images/tw-splash.png';
	import type { LayoutData } from './$types';
	import Sidebar from '$comp/sidebar/Sidebar.svelte';
	import { profileStore } from '$stores/profile';

	export let data: LayoutData;

	let { supabase, session, sclient } = data;

	$: ({ supabase, session, sclient } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	onMount(() => {
		setTitle('');
	});
</script>

<svelte:head>
	<title>{$titleStore}</title>
</svelte:head>

<Modal />
<Toast />
<ProgressBar />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail width="w-72" regionTrail="p-2" regionLead="flex" regionDefault="overflow-hidden">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center gap-2 p-3">
					<span class="flex self-end">
						<Icon icon="mdi-light:home" width={32} />
					</span>
					<h3 class="h3">Social</h3>
				</a>
				<a
					href="#content"
					class="fixed -top-40 flex self-center text-lg font-semibold focus:static focus:top-0"
					>Skip to content</a
				>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<Sidebar {sclient} />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					{#if $profileStore}
						<section class="flex h-full justify-between gap-3">
							<ProfileCard {sclient} profile={$profileStore} />
							<div class="flex h-full items-center justify-center gap-2">
								<a href="/settings/account" class="btn border-0 p-1" aria-label="settings">
									<Icon icon="mdi:settings" width={24} />
								</a>
							</div>
						</section>
					{/if}
				{:else}
					<SignInUp />
				{/if}
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight" />
	<!-- Page Route Content -->
	{#key $page.url}
		<div id="content" class="flex h-full w-full" transition:fade={{ duration: 200 }}>
			<div class="fixed h-full w-full blur-lg">
				<picture>
					<img src={twSplashImage} alt="tw splash" width="1927" height="1051" />
				</picture>
			</div>
			<div class="mx-auto h-full w-full backdrop-blur-0 lg:w-4/5 xl:w-3/5">
				<slot />
			</div>
		</div>
	{/key}
</AppShell>
