<script context="module" lang="ts">
	declare global {
		interface Window {
			grecaptcha: ReCaptchaV2.ReCaptcha;
			onLoadGrecaptcha: any;
		}
	}
</script>

<script lang="ts">
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import { createField } from 'felte';
	import { onMount } from 'svelte';

	export let name: string;

	const { field, onChange } = createField(name, {
		onFormReset: (e) => {
			console.log({ e });
		},
	});

	let instanceId = -1;

	function onReset() {
		onChange('');
	}
	export function _reset() {
		// // i don't know why but it fixes the bug
		// setTimeout(() => {
		// if (instanceId != -1) {
		// window.grecaptcha.reset(instanceId);
		onReset();
		// }
		// }, 1000);
	}

	let placeholder: any;

	function onLoadGrecaptcha() {
		window.grecaptcha.ready(() => {
			instanceId = window.grecaptcha.render(placeholder, {
				sitekey: PUBLIC_RECAPTCHA_SITE_KEY,
				badge: 'bottomleft',
				size: 'normal',
				theme: 'dark',
				callback: onChange,
				'expired-callback': onReset,
				'error-callback': onReset,
			});
		});
	}

	onMount(() => {
		window.onLoadGrecaptcha = onLoadGrecaptcha;
	});

	// onDestroy(() => {
	// window.onLoadGrecaptcha = null;
	// if (window.grecaptcha) {
	// 	window.grecaptcha.reset(instanceId);
	// }
	// });
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?onload=onLoadGrecaptcha&render=explicit">
	</script>
</svelte:head>
<div bind:this={placeholder} use:field tabindex="0" class="g-recaptcha" />
