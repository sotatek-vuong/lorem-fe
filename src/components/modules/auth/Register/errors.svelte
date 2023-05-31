<script lang="ts">
	export let helperText: string = '';
	export let errors: string[] | null;
	export let errorTitle: string = '';
</script>

{#if helperText !== ''}
	<p class="text-content-2 mb-1 text-xs leading-[13px]">{helperText}</p>
{/if}
{#if errors}
	<ul class="list-disc list-inside marker:mr-1">
		{errorTitle}
		{#each errors as err}
			<li>
				{err}
			</li>
		{/each}
	</ul>
{/if}
