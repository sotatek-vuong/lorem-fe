<script lang="ts">
	import GoogleIcon from 'src/assets/icons/google.svg?raw';
	import FacebookIcon from 'src/assets/icons/facebook.svg?raw';
	import GithubIcon from 'src/assets/icons/github.svg?raw';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';

	function onGoogle() {
		const client = google.accounts.oauth2.initTokenClient({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			scope:
				'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
			callback: (res) => {
				console.log({ res });
			},
		});
		client.requestAccessToken();
	}

	function onFb() {
		window.FB.init({
			appId: '1181911378889864',
			autoLogAppEvents: true,
			xfbml: true,
			version: 'v17.0',
		});

		window.FB.getAccessToken();
	}
</script>

<div class="grid gap-1 oauth">
	<button type="submit" class="btn bg-bg-1" on:click={onGoogle}>
		{@html GoogleIcon}
	</button>
	<button type="submit" class="btn bg-bg-1">
		{@html FacebookIcon}
	</button>
	<button type="submit" class="btn bg-bg-1">
		{@html GithubIcon}
	</button>
</div>

<style>
	.oauth {
		grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	}
</style>
