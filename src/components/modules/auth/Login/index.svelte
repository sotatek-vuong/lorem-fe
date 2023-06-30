<script context="module" lang="ts">
	export const loginSchema = z.object({
		username: z.union([
			z.string().email('Email is invalid format. Please check again.'),
			z
				.string()
				.min(4, 'Minimum character length is 4')
				.max(40, 'Maximum character length is 40')
				.regex(/^[a-zA-Z0-9]*$/g, 'Only numbers and letters'),
		]),
		password: z.string().min(8, 'Minimum character length is 8'),
		agree: z.boolean().refine((s) => s, { message: 'Please check this to continue.' }),
		recaptcha: z.string().nonempty(),
	});

	export type LoginSchemaType = z.infer<typeof loginSchema>;
</script>

<script lang="ts">
	import { z } from 'zod';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Recaptcha from '@/components/core/Recaptcha.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import TextField from '@/components/core/TextField.svelte';
	import Divider from '@/components/core/Divider.svelte';
	import SocialMedia from '@/components/modules/auth/SocialMedia.svelte';
	import _ from 'lodash';
	import Checkbox from '@/components/core/Checkbox.svelte';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	const { form, errors, isValid } = createForm<LoginSchemaType>({
		extend: [validator({ schema: loginSchema, level: 'error' }), reporter],
		onSubmit: (data) => {
			console.log(data);
		},
	});

	$: console.log($errors);

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
					<ValidationMessage for="username" let:messages>
						{#if messages}
							{messages[0]}
						{/if}
					</ValidationMessage>
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
					<ValidationMessage for="password" let:messages>
						{#if messages}
							{messages[0]}
						{/if}
					</ValidationMessage>
				</svelte:fragment>
			</TextField>

			<Checkbox name="agree" slotLabel="items-center" required error={$errors.agree !== null}>
				<svelte:fragment slot="label">
					I am above 18 years of age, and accept the
					<a href="/" class="underline" target="blank">Terms & Conditions</a>
				</svelte:fragment>
				<svelte:fragment slot="helpertext">
					<ValidationMessage for="agree" let:messages>
						{#if messages}
							{messages[0]}
						{/if}
					</ValidationMessage>
				</svelte:fragment>
			</Checkbox>

			<div
				tabindex="0"
				class="no-underline hover:underline cursor-pointer self-start text-main"
				role="button"
			>
				Forgot password?
			</div>

			<Recaptcha name="recaptcha" />

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

		<SocialMedia />

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
