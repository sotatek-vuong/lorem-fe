<script lang="ts">
	import { z } from 'zod';

	import { modalStore } from '@skeletonlabs/skeleton';
	import Recaptcha from '@/components/core/Recaptcha.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import TextField from '@/components/core/TextField.svelte';
	import Divider from '@/components/core/Divider.svelte';
	import SocialMediaAuth from '@/components/modules/auth/SocialMedia.svelte';
	import _ from 'lodash';

	const schema = z.object({
		username: z
			.string()
			.min(3, 'Minimum character length is 3')
			.max(30, 'Maximum character length is 30')
			.regex(/^[a-zA-Z0-9]*$/g, 'Only numbers and letters')
			.optional()
			.or(z.string().email('Email is invalid format. Please check again.')),
		password: z.string().min(8, 'Minimum character length is 8'),
		recaptcha: z.string().nonempty(),
	});

	const { form, errors, data, isValid } = createForm<z.infer<typeof schema>>({
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

{#if $modalStore[0]?.component === 'login'}
	<div class="card flex flex-col gap-4 p-10 w-modal">
		<h2 class="h2 font-bold text-center">Login</h2>
		<form use:form novalidate class="flex flex-col gap-4">
			<TextField
				label="Email or Username"
				required
				name="username"
				error={$errors.username !== null}
			>
				<svelte:fragment slot="helpertext">
					{#if $errors.username}
						{$errors.username[0]}
					{/if}
				</svelte:fragment>
			</TextField>

			<TextField
				label="Password"
				required
				type="password"
				name="password"
				error={$errors.password !== null}
			>
				<svelte:fragment slot="helpertext">
					{#if $errors.password}
						{$errors.password[0]}
					{/if}
				</svelte:fragment>
			</TextField>

			<div
				tabindex="0"
				class="no-underline hover:underline cursor-pointer self-start text-main"
				role="button"
			>
				Forgot password?
			</div>

			<Recaptcha bind:value={$data.recaptcha} />

			<button
				disabled={!$isValid}
				tabindex="0"
				type="submit"
				class="btn variant-filled-primary w-full">Login</button
			>
		</form>

		<Divider>
			<span class="flex-shrink mx-4 font-bold text-content-2">OR</span>
		</Divider>

		<SocialMediaAuth />

		<p class="text-center">
			New to Lorem?
			<button
				tabindex="0"
				on:click={onRegister}
				class="no-underline hover:underline cursor-pointer self-start text-main"
			>
				Register here
			</button>
		</p>
		<slot />
	</div>
{/if}
