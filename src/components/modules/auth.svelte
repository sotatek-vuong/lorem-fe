<script lang="ts">
	export const parent = {};

	import { modalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	onMount(() => {
		google.accounts.id.renderButton(document.getElementById('auth_google')!, {
			type: 'standard',
			shape: 'pill',
			size: 'large',
			theme: 'outline',
			text: 'continue_with',
			logo_alignment: 'left',
			width: '100%',
		});
	});
</script>

{#if modalStore}
	<div class="card flex-col p-10 gap-4 w-modal">
		<div id="auth_google" />
	</div>
{/if}
