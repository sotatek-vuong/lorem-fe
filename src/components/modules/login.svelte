<script lang="ts">
	export const parent = {};
	import { z } from 'zod';

	// Stores
	import GoogleIcon from 'src/assets/icons/google.svg?raw';
	import FacebookIcon from 'src/assets/icons/facebook.svg?raw';
	import GithubIcon from 'src/assets/icons/github.svg?raw';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import TextField from '../core/TextField.svelte';

	const schema = z.object({
		username: z
			.string()
			.min(3, 'Minimum character length is 3')
			.max(30, 'Maximum character length is 30')
			.regex(/^[a-zA-Z0-9]*$/g, 'Only numbers and letters')
			.or(z.string().email('Email is invalid format. Please check again.')),
		password: z.string().min(8, 'Minimum character length is 8'),
	});

	const { form, errors } = createForm<z.infer<typeof schema>>({
		extend: [validator({ schema, level: 'error' })],
		onSubmit: (data) => {
			console.log(data);
		},
	});

	const onRegister = () => {
		modalStore.close();
		modalStore.trigger({ type: 'component', component: 'register' });
	};
</script>

{#if modalStore}
	<div class="card flex-col p-10 w-modal">
		<h2 class="h2 mb-4 font-bold text-center">Login</h2>
		<form use:form novalidate class="flex flex-col gap-4">
			<TextField
				label="Email or Username"
				required
				name="username"
				error={$errors.username !== null}
			>
				<svelte:fragment slot="helpertext">
					{#if $errors.username}
						<p class="text-error-500">{$errors.username[0]}</p>
					{/if}
				</svelte:fragment>
			</TextField>

			<TextField label="Password" required name="password" error={$errors.password !== null}>
				<svelte:fragment slot="helpertext">
					{#if $errors.password}
						<p class="text-error-500">{$errors.password[0]}</p>
					{/if}
				</svelte:fragment>
			</TextField>

			<div
				tabindex="0"
				class="no-underline hover:underline cursor-pointer self-start text-primary-500"
				role="button"
			>
				Forgot password?
			</div>

			<button tabindex="0" type="submit" class="btn variant-filled-primary w-full">Login</button>

			<div class="relative flex items-center">
				<div class="flex-grow border-t border-border" />
				<span class="flex-shrink mx-4 font-bold text-gray-400">OR</span>
				<div class="flex-grow border-t border-border" />
			</div>

			<div class="grid gap-1 oauth">
				<button class="btn bg-tertiary-500">
					{@html GoogleIcon}
				</button>
				<button class="btn bg-tertiary-500">
					{@html FacebookIcon}
				</button>
				<button class="btn bg-tertiary-500">
					{@html GithubIcon}
				</button>
			</div>

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

<style>
	.oauth {
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
	}
</style>
