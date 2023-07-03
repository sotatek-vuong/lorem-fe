<script lang="ts">
	import '../app.postcss';

	import Header from '@/components/modules/Header.svelte';
	import Login from '@/components/modules/auth/Login.svelte';
	import Register from '@/components/modules/auth/Register.svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import { CTX_STORE } from '@/utils/constants/key';
	// import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';

	export let data: LayoutData;
	const authStore = writable();
	$: {
		if (data) {
			authStore.set(data);
		}
	}

	setContext(CTX_STORE.AUTH, authStore);

	// onMount(() => {
	// 	const id = google.accounts.id;

	// 	id.initialize({
	// 		client_id: PUBLIC_GOOGLE_CLIENT_ID,
	// 		cancel_on_tap_outside: false,
	// 		callback: console.log,
	// 		ux_mode: 'popup',
	// 	});

	// 	id.prompt();
	// });
</script>

<!-- <svelte:head>
	<script src="https://accounts.google.com/gsi/client"></script>
	<script src="https://connect.facebook.net/en_US/sdk.js"></script>
</svelte:head> -->
<nav class="border-b border-divider">
	<Header />
</nav>

<div class="container mx-auto px-4 flex-1">
	<slot />
</div>

<hr />
Footer

<Login />
