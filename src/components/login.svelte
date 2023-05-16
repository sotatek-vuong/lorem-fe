<script lang="ts">
	export const parent = {};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		username: '',
		password: ''
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
				<span>Username <span class="text-error-500">*</span></span>
				<input class="input" type="text" bind:value={formData.username} />
			</label>
			<label class="label" aria-required="true">
				<span>Password <span class="text-error-500">*</span></span>
				<input class="input" type="password" bind:value={formData.password} />
			</label>

			<div
				class="no-underline hover:underline cursor-pointer self-start text-primary-500"
				role="button"
			>
				Forgot password?
			</div>

			<button type="submit" class="btn variant-filled-primary w-full">Login</button>

			<p class="text-center">
				New to Lorem?
				<span
					class="no-underline hover:underline cursor-pointer self-start text-primary-500"
					role="button"
				>
					Register here
				</span>
			</p>
		</form>

		<slot />
	</div>
{/if}
