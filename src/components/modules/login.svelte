<script lang="ts">
	export const parent = {};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		account: '',
		password: '',
		rememberMe: true
	};

	const onRegister = () => {
		modalStore.close();
		modalStore.trigger({ type: 'component', component: 'register' });
	};

	const onSubmit = () => {
		console.log(formData);
	};
</script>

{#if modalStore}
	<div class="card flex-col p-10 w-modal">
		<h2 class="h2 mb-6 font-bold">Login</h2>
		<form on:submit={onSubmit} class="flex flex-col gap-6">
			<label class="label">
				<span>Email or Username <span class="text-error-500">*</span></span>
				<input tabindex="0" class="input" type="text" bind:value={formData.account} />
			</label>
			<label class="label" aria-required="true">
				<span>Password <span class="text-error-500">*</span></span>
				<input tabindex="0" class="input" type="password" bind:value={formData.password} />
			</label>

			<label class="flex items-center self-start space-x-2">
				<input tabindex="0" class="checkbox" type="checkbox" bind:checked={formData.rememberMe} />
				<p>Remember Me</p>
			</label>

			<div
				tabindex="0"
				class="no-underline hover:underline cursor-pointer self-start text-primary-500"
				role="button"
			>
				Forgot password?
			</div>

			<button tabindex="0" type="submit" class="btn variant-filled-primary w-full">Login</button>

			<p class="text-center">
				New to Lorem?
				<button
					tabindex="0"
					on:click={onRegister}
					class="no-underline hover:underline cursor-pointer self-start text-primary-500"
				>
					Register here
				</button>
			</p>
		</form>

		<slot />
	</div>
{/if}
