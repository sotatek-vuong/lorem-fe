<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import Header from '@/components/modules/Header.svelte';
	import Login from '@/components/modules/auth/Login/index.svelte';
	import Register from '@/components/modules/auth/Register/index.svelte';
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
	<Modal components={{ login: { ref: Login }, register: { ref: Register } }} />
</AppShell>
