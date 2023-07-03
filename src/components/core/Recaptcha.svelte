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
	import { sleep } from '@/utils/time';
	import { createField } from 'felte';
	import { onMount } from 'svelte';

	export let name: string;

	const { field, onChange } = createField(name);

	let instanceId = -1;

	function onReset() {
		onChange('');
	}
	export const reset = async () => {
		if (instanceId != -1) {
			window.grecaptcha.reset(instanceId);
			onReset();
		}
		await sleep(0.1);
	};

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
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?onload=onLoadGrecaptcha&render=explicit">
	</script>
</svelte:head>

<div>
	<input use:field {...$$restProps} class="hidden" />
	<div bind:this={placeholder} class="g-recaptcha" />
</div>

<style>
	.g-recaptcha {
		/* transform: scale(0.77);
		-webkit-transform: scale(0.77);
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0; */
	}
</style>
