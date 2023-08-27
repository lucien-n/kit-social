<script lang="ts">
	export let labeled: boolean = true;
	export let label: string = '';

	export let cclass: string = '';

	export let type: 'password' | 'text' | 'email' = 'text';
	export let name: string;
	export let id: string = name;
	export let placeholder: string = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);

	export let required: boolean = false;
</script>

{#if labeled}
	<section>
		<label for={id} class="label">{label}</label>
		<input {id} {name} {type} {placeholder} {required} class="input {cclass}" />
	</section>
{:else}
	<input {id} {name} {type} {placeholder} {required} class="input {cclass}" />
{/if}
