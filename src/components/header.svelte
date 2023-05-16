<script>
	import { AppBar, modalStore } from '@skeletonlabs/skeleton';

	const onLogin = () => {
		modalStore.trigger({
			type: 'component',
			component: 'login'
		});
	};
</script>

<AppBar
	background="bg-surface-900"
	border="border-b border-surface-500"
	padding="p-0"
	regionRowMain="container mx-auto p-4"
	slotTrail="flex-wrap"
>
	<svelte:fragment slot="lead">
		<a href="/" class="h2 text-primary-500 font-medium">Lorem</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button type="button" class="btn btn-sm hover:variant-soft-surface" on:click={onLogin}
			>Login</button
		>
		<button type="button" class="btn btn-sm variant-filled-primary">Register</button>
	</svelte:fragment>
</AppBar>
