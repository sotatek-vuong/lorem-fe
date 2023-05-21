<script>
	import { modalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	onMount(() => {
		modalStore.trigger({ type: 'component', component: 'register' });
	});
</script>
