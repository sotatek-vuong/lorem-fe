<script lang="ts">
	export let label: string = '';
	export let required: boolean = false;
	export let error: boolean = false;
</script>

<label class="flex items-start gap-3">
	<input class="checkbox" type="checkbox" {...$$restProps} />

	<div>
		<p class="mb-1">
			{#if required}
				<span class="text-error-500">* </span>
			{/if}
			<slot name="label" />
		</p>
		<slot name="helpertext" />
	</div>
</label>
