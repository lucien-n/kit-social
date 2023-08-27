<script lang="ts">
	export let profile: SupaProfile;
</script>

<article
	id="{profile.name.toLowerCase().trim().replace(' ', '-')}-profile"
	class="flex h-full w-full items-center justify-center"
>
	<h1>{Object.values(profile)}</h1>
</article>
