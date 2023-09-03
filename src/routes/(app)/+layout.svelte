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
	import type { TPublicProfile } from '$types/public_profile.type';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import type SocialClient from '$sclient/sclient';
	import type { TPendingFollow } from '$types/pending_follow';
	import SignInUp from '$comp/SignInUp.svelte';
	import ProfileCard from '$comp/profile/ProfileCard.svelte';
	import PendingList from '$comp/profile/PendingList.svelte';
	import FollowedList from '$comp/profile/FollowedList.svelte';
	import FollowerList from '$comp/profile/FollowerList.svelte';
	import { titleStore } from '$stores/title';
	import {
		AppShell,
		AppRail,
		Modal,
		initializeStores,
		Toast,
		TabGroup,
		Tab
	} from '@skeletonlabs/skeleton';
	import { setTitle } from '$lib/utilities/main';
	import { navigating } from '$app/stores';
	import { fade, fly, slide } from 'svelte/transition';
	import ProgressBar from '$comp/ProgressBar.svelte';

	export let data: {
		supabase: SupabaseClient;
		session: Session | null;
		sclient: SocialClient;
		streamed: {
			followed_users: Promise<TPublicProfile[]>;
			followers: Promise<TPublicProfile[]>;
			pending_follows: Promise<TPendingFollow[]>;
		};
	};

	let {
		supabase,
		session,
		sclient,
		streamed: { followed_users, followers, pending_follows }
	} = data;

	$: ({
		supabase,
		session,
		sclient,
		streamed: { followed_users, followers, pending_follows }
	} = data);

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

	let friendsTabSet: number = 0;
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
		<AppRail width="w-72" regionTrail="p-2" regionDefault="overflow-hidden">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center gap-2 p-3">
					<span class="flex self-end">
						<Icon icon="mdi-light:home" width={32} />
					</span>
					<h3 class="h3">Social</h3>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<TabGroup
					justify="justify-center"
					border="border-0"
					rounded="rounded-none"
					regionPanel="p-2"
				>
					<Tab bind:group={friendsTabSet} name="followed" value={0} regionTab="text-center">
						<p class="text-base">Followed</p>
					</Tab>
					<Tab bind:group={friendsTabSet} name="followers" value={1} regionTab="text-center">
						<p class="text-base">Followers</p>
					</Tab>
					<Tab bind:group={friendsTabSet} name="pending" value={2} regionTab="text-center">
						<p class="text-base">Pending</p>
					</Tab>
					<svelte:fragment slot="panel">
						{#if friendsTabSet == 0}
							<FollowedList {sclient} {followed_users} />
						{:else if friendsTabSet == 1}
							<FollowerList {sclient} {followers} />
						{:else}
							<PendingList {sclient} {pending_follows} />
						{/if}
					</svelte:fragment>
				</TabGroup>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<ProfileCard {sclient} />
				{:else}
					<SignInUp />
				{/if}
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight" />
	<!-- Page Route Content -->
	<div class="mx-auto h-full w-full lg:w-4/5 xl:w-3/5">
		<slot />
	</div>
</AppShell>
