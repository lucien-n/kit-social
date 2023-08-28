<script lang="ts">
	// #==========[ START OF SKELETON SHANANIGANS ]==========#
	import '../../app.postcss';
	import { AppShell, AppRail } from '@skeletonlabs/skeleton';

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
	import Icon from '@iconify/svelte';
	import FollowedList from '$comp/FollowedList.svelte';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onlineUsersStore } from '$stores/online';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let presence_channel: RealtimeChannel;

	onMount(async () => {
		presence_channel = supabase.channel('online-users', {
			config: { presence: { key: session?.user.id } }
		});

		presence_channel.on('presence', { event: 'sync' }, () => {
			const new_state = presence_channel.presenceState();
		});

		presence_channel.on('presence', { event: 'join' }, ({ key: uid }) => {
			$onlineUsersStore.add(uid);
			console.log('a user joined', $onlineUsersStore);
		});

		presence_channel.on('presence', { event: 'leave' }, ({ key: uid }) => {
			$onlineUsersStore.delete(uid);
			console.log('a user left', $onlineUsersStore);
		});

		presence_channel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				await presence_channel.track({});
			}
		});
	});
</script>

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
				<FollowedList />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<ProfileCard />
				{:else}
					<div class="flex w-full flex-col gap-3 p-2">
						<a href="/auth/signin" class="variant-ghost-surface btn"
							><p>Sign In</p>
							<span class="flex self-center">
								<Icon icon="mdi:login" width={20} />
							</span>
						</a>
						<a href="/auth/signup" class="variant-ghost-surface btn"
							><p>Sign Up</p>
							<span class="flex self-center">
								<Icon icon="mdi:register" width={20} />
							</span>
						</a>
					</div>
				{/if}
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight" />
	<!-- Page Route Content -->
	<slot />
</AppShell>
