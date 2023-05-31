<script lang="ts">
	export let required: boolean = false;
	export let error: boolean = false;

	export let slotLabel: string = '';
</script>

<label class="flex items-start gap-3 {slotLabel}">
	<input class="checkbox" type="checkbox" {...$$restProps} />

	<div>
		<p>
			{#if required}
				<span class="text-status-error">* </span>
			{/if}
			<slot name="label" />
		</p>
		{#if $$slots.helpertext}
			<div class="mt-1 {error ? 'text-status-error' : ''}">
				<slot name="helpertext" />
			</div>
		{/if}
	</div>
</label>
