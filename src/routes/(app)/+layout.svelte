<script lang="ts">
	// #==========[ START OF SKELETON SHANANIGANS ]==========#
	import '../../app.postcss';
	import {
		AppShell,
		AppRail,
		Modal,
		initializeStores,
		LightSwitch,
		Toast
	} from '@skeletonlabs/skeleton';

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

	initializeStores();

	// #==========[ END OF SKELETON SHANANIGANS ]==========#

	import ProfileCard from '$comp/ProfileCard.svelte';
	import Icon from '@iconify/svelte';
	import FollowedList from '$comp/FollowedList.svelte';
	import SignInUp from '$comp/SignInUp.svelte';
	import type { PublicProfile } from '$types/public_profile.type';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let data: {
		supabase: SupabaseClient;
		session: Session | null;
		streamed: {
			followed_users: Promise<PublicProfile[] | null>;
			notifications_amount: Promise<number | null>;
		};
	};

	let {
		supabase,
		session,
		streamed: { followed_users, notifications_amount }
	} = data;
	$: ({
		supabase,
		session,
		streamed: { followed_users, notifications_amount }
	} = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	onMount(async () => {
		console.log(notifications_amount);
	});
</script>

<Modal />
<Toast />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail width="w-72">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center gap-2 p-3">
					<span class="flex self-end">
						<Icon icon="mdi-light:home" width={32} />
					</span>
					<h3 class="h3">Social</h3>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<FollowedList {followed_users} />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<ProfileCard {notifications_amount} />
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
