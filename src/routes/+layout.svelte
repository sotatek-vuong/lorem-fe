<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';
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
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<div class="container mx-auto px-4">
		<slot />
	</div>

	<svelte:fragment slot="pageFooter">
		<hr />
		Footer
	</svelte:fragment>
	<Modal components={{ login: { ref: Login }, register: { ref: Register } }} />
</AppShell>
