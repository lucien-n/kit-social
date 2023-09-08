# Todo

- [ ] FIX FOLLOWINGS
  - [x] need to click on follow/unfollow twice
  - [x] confirm when private doesn't show up
  - [x] refresh layout.svelte followed list
    > Reworked sidebar, now fetching everytime the comp is mounted
    - [ ] Add a cooldown
- [x] Rework FollowButton.svelte
- [ ] fix form being undefined on page.svelte but defined on page.server.ts
- [ ] Cleanup supabase RLS
- [ ] Cleanup supabase functions
- [x] Fix supabase act_pending_follow returning success even tho it did nothing (probably because of is_follow_pending)
  > Wasn't supabase's fault - I passed the wrong uid
