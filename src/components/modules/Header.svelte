<script lang="ts">
	import type { AuthResponse } from '@/api/auth';
	import { CTX_STORE } from '@/utils/constants/key';
	// import { AppBar, modalStore } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const auth = getContext<Writable<AuthResponse>>(CTX_STORE.AUTH);

	const onLogin = () => {
		// modalStore.trigger({
		// 	type: 'component',
		// 	component: 'login',
		// });
	};

	const onRegister = () => {
		// modalStore.trigger({
		// 	type: 'component',
		// 	component: 'register',
		// });
	};
</script>

<!-- <AppBar
	background="bg-surface-900"
	border="border-b border-border"
	padding="p-0"
	regionRowMain="container mx-auto p-4"
	slotTrail="flex-wrap"
>
	<svelte:fragment slot="lead">
		<a href="/" class="h2 text-xl border-border text-main font-medium">Lorem</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if $auth?.user}
			{$auth.user?.username}
		{:else}
			<button type="button" class="btn btn-sm hover:variant-soft-surface" on:click={onLogin}
				>Login</button
			>
			<button type="button" class="btn btn-sm variant-filled-primary" on:click={onRegister}
				>Register</button
			>
		{/if}
	</svelte:fragment>
</AppBar> -->
