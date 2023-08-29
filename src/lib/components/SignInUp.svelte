<script lang="ts">

	import Icon from "@iconify/svelte";

</script>
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