<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import Header from '@/components/modules/header.svelte';
	import Login from '@/components/modules/login.svelte';
	import Register from '@/components/modules/register/index.svelte';
	import Auth from '@/components/modules/auth.svelte';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { onMount } from 'svelte';

	onMount(() => {
		google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			cancel_on_tap_outside: false,
			callback: console.log,
		});
		google.accounts.id.prompt();
	});
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>
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
	<Modal components={{ login: { ref: Login }, register: { ref: Register }, auth: { ref: Auth } }} />
</AppShell>
