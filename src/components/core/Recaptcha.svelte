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
	import { onMount, onDestroy } from 'svelte';

	export let value: string = '';

	let instanceId = -1;

	function onSuccess(token: string) {
		value = token;
	}
	function onError() {
		value = '';
	}

	let placeholder: any;

	function onLoadGrecaptcha() {
		window.grecaptcha.ready(() => {
			instanceId = window.grecaptcha.render(placeholder, {
				sitekey: PUBLIC_RECAPTCHA_SITE_KEY,
				badge: 'bottomleft',
				size: 'normal',
				theme: 'dark',
				callback: onSuccess,
				'expired-callback': onError,
				'error-callback': onError,
			});
		});
	}

	onMount(() => {
		window.onLoadGrecaptcha = onLoadGrecaptcha;
	});

	onDestroy(() => {
		window.onLoadGrecaptcha = null;
		if (window.grecaptcha) {
			window.grecaptcha.reset(instanceId);
		}
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?onload=onLoadGrecaptcha&render=explicit">
	</script>
</svelte:head>
<div bind:this={placeholder} class="g-recaptcha" />
