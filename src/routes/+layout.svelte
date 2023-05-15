<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '../components/header.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>

	<slot />
	<svelte:fragment slot="pageFooter">
		<hr />
		Page Footer
	</svelte:fragment>
</AppShell>
