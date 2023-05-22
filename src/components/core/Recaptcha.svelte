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

	function onLoadGrecaptcha() {
		instanceId = window.grecaptcha.render('googleRecaptchaDiv', {
			sitekey: PUBLIC_RECAPTCHA_SITE_KEY,
			badge: 'bottomleft',
			size: 'normal',
			theme: 'dark',
			callback: onSuccess,
			'expired-callback': onError,
			'error-callback': onError,
		});
	}

	onMount(() => {
		window.onLoadGrecaptcha = onLoadGrecaptcha;
	});

	onDestroy(() => {
		window.onLoadGrecaptcha = null;
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?onload=onLoadGrecaptcha&render=explicit">
	</script>
</svelte:head>
<div id="googleRecaptchaDiv" class="g-recaptcha" />
