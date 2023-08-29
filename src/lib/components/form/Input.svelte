<script lang="ts">
	import Icon from '@iconify/svelte';

	export let value: string | undefined = '';

	export let label = '';
	export let cclass = '';

	export let type: 'password' | 'text' | 'email' = 'text';
	export let name: string;
	export let id: string = name;
	export let placeholder: string = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);

	export let required = false;

	let showPassword = false;
	const toggleShowPassword = () => {
		showPassword = !showPassword;
		type = showPassword ? 'text' : 'password';
	};
</script>

{#if label != '' || label.length > 0}
	<section>
		<label for={id} class="label">{label}</label>
		{#if type == 'password' || showPassword}
			<div class="input-group flex">
				<input {value} {id} {name} {type} {placeholder} {required} class="input {cclass}" />
				<button type="button" on:click={toggleShowPassword} name="toggle-show-password">
					{#if showPassword}
						<Icon icon="mdi:eye-closed" width={20} />
					{:else}
						<Icon icon="mdi:eye" width={20} />
					{/if}
				</button>
			</div>
		{:else}
			<input {value} {id} {name} {type} {placeholder} {required} class="input {cclass}" />
		{/if}
	</section>
{:else}
	<input {value} {id} {name} {type} {placeholder} {required} class="input {cclass}" />
{/if}
