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
	import Register from '@/components/modules/register.svelte';
</script>

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
