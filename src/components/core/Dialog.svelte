<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import closeIcon from '@/assets/icons/close.svg?raw';

	export let id: string;
	export let paper = 'card flex flex-col gap-4 p-10';
	export let width = 'w-modal';
</script>

{#if $modalStore[0]?.component === id}
	<div class="{paper} {width} relative">
		<slot />

		<button class="btn-icon absolute top-2 right-2" on:click={modalStore.close}>
			{@html closeIcon}
		</button>
	</div>
{/if}
