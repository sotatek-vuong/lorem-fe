<script lang="ts">
	import ShowPw from 'src/assets/icons/show-pw.svg?raw';
	import HidePw from 'src/assets/icons/hide-pw.svg?raw';
	import _ from 'lodash';
	export let value: string = '';
	export let label: string = '';
	export let required: boolean = false;
	export let type = 'text';
	export let error: any = false;

	const id = $$restProps.name;

	const showToggle = type === 'password';

	const onToggle = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<div class="form-control">
	{#if label}
		<label for={id} class="label justify-start p-0 mb-2">
			{label}
			{#if required}
				<span class="text-status-error"> *</span>
			{/if}
		</label>
	{/if}

	<div class="join">
		<input class="input" bind:value {...$$restProps} {...{ type }} />
		{#if showToggle}
			<button type="button" class="btn-icon hover:variant-soft-surface" on:click={onToggle}>
				{@html type === 'password' ? ShowPw : HidePw}
			</button>
		{/if}
	</div>
	{#if $$slots.helpertext}
		<div class={error ? 'text-status-error' : ''}>
			<slot name="helpertext" />
		</div>
	{/if}
</div>
