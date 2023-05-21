<script lang="ts">
	import ShowPw from 'src/assets/icons/show-pw.svg?raw';
	import HidePw from 'src/assets/icons/hide-pw.svg?raw';
	export let value: string = '';
	export let label: string = '';
	export let required: boolean = false;
	export let type = 'text';
	export let error: boolean = false;

	const showToggle = type === 'password';

	const onToggle = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<label class="label">
	{#if label}
		<span
			>{label}
			{#if required}
				<span class="text-error-500"> *</span>
			{/if}
		</span>
	{/if}

	<div class="input-group flex items-center{error ? ' border-error-500' : ''}">
		<input class="flex-grow flex-shrink-0" bind:value {...$$restProps} {...{ type }} />
		{#if showToggle}
			<button type="button" class="btn-icon hover:variant-soft-surface" on:click={onToggle}>
				{@html type === 'password' ? ShowPw : HidePw}
			</button>
		{/if}
	</div>
	<slot name="helpertext" />
</label>
