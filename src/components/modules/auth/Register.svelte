<script context="module" lang="ts">
	export const registerSchema = z
		.object({
			username: z
				.string()
				.nonempty('This field cannot be empty.')
				.min(3, '3-30 characters')
				.max(30, '3-30 characters')
				.regex(/^[a-zA-Z0-9]*$/g, 'Only numbers and letters'),
			email: z
				.string()
				.nonempty('This field cannot be empty.')
				.email('Email is invalid format. Please check again.'),
			password: z
				.string()
				.nonempty('This field cannot be empty.')
				.min(8, 'At least 8 characters')
				.regex(/.*[0-9].*/, '1 number')
				.regex(/.*[A-Z].*/, '1 uppercase')
				.regex(/.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?~`].*/, '1 special character'),
			confirmPw: z.string().nonempty('This field cannot be empty.'),
			agree: z.boolean().refine((s) => s, { message: 'Please check this to continue.' }),
			recaptcha: z.string().nonempty('required'),
		})
		.refine(({ password, confirmPw }) => password === confirmPw, {
			message: 'Password does not match.',
			path: ['confirmPw'],
		});

	export type RegisterSchemaType = z.infer<typeof registerSchema>;
</script>

<script lang="ts">
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import TextField from '@/components/core/TextField.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import Checkbox from '@/components/core/Checkbox.svelte';
	import Recaptcha from '@/components/core/Recaptcha.svelte';
	import _ from 'lodash';
	import Divider from '@/components/core/Divider.svelte';
	import SocialMedia from './SocialMedia.svelte';
	import { register, type AuthResponse } from '@/api/auth';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { CTX_STORE } from '@/utils/constants/key';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Dialog from '@/components/core/Dialog.svelte';

	let recaptchaRef: Recaptcha;

	const authStore = getContext<Writable<AuthResponse>>(CTX_STORE.AUTH);
	const { form, errors, isValid, isSubmitting } = createForm<RegisterSchemaType>({
		extend: [validator({ schema: registerSchema, level: 'error' }), reporter],
		initialValues: {
			email: '',
			username: '',
			password: '',
			confirmPw: '',
			agree: false,
			recaptcha: '',
		},
		onSubmit: async (body) => {
			const data = await register(body);
			authStore.set(data);
			modalStore.close();
		},
		onError: async (err: any, ctx) => {
			await recaptchaRef.reset();
			switch (err.code) {
				case '1':
					ctx.setErrors('username', 'Username already exist. Please try another one.');
					break;

				case '2':
					ctx.setErrors('email', 'Email already exist. Please try another one.');
					break;
			}
		},
	});

	const openLogin = () => {
		modalStore.close();
		modalStore.trigger({ type: 'component', component: 'login' });
	};
</script>

<Dialog id="register" paper="card p-10">
	<h2 class="h2 text-2xl mb-2 font-bold">Register to Play</h2>
	<p class="text-content-2">
		Already a user?
		<button
			on:click={openLogin}
			class="no-underline hover:underline cursor-pointer self-start text-main">Login here</button
		>
	</p>
	<form use:form novalidate autocapitalize="off" class="flex flex-col gap-6 mt-6">
		<TextField label="Username" required name="username" error={$errors.username}>
			<svelte:fragment slot="helpertext">
				<p class="text-content-2 mb-1 text-xs leading-[13px]">Lowercase letters and numbers only</p>
				<ValidationMessage for="username" let:messages>
					{#if messages}
						<ul class="list-disc list-inside marker:mr-1">
							Username must be:
							{#each messages as err}
								<li>{err}</li>
							{/each}
						</ul>
					{/if}
				</ValidationMessage>
			</svelte:fragment>
		</TextField>

		<TextField label="Email" required name="email" type="email" error={$errors.email}>
			<svelte:fragment slot="helpertext">
				<ValidationMessage for="email" let:messages>
					{#if messages}
						{messages[0]}
					{/if}
				</ValidationMessage>
			</svelte:fragment>
		</TextField>

		<TextField label="Password" required name="password" type="password" error={$errors.password}>
			<svelte:fragment slot="helpertext">
				<p class="text-content-2 mb-1 text-xs leading-[13px]">
					Use 8 or more characters with at least 1 uppercase, numbers & symbols.
				</p>
				<ValidationMessage for="password" let:messages>
					{#if messages}
						<ul class="list-disc list-inside marker:mr-1">
							Password must contain:
							{#each messages as err}
								<li>{err}</li>
							{/each}
						</ul>
					{/if}
				</ValidationMessage>
			</svelte:fragment>
		</TextField>

		<TextField
			label="Confirm Password"
			required
			name="confirmPw"
			type="password"
			error={$errors.confirmPw}
		>
			<svelte:fragment slot="helpertext">
				<ValidationMessage for="confirmPw" let:messages>
					{#if messages}
						{messages[0]}
					{/if}
				</ValidationMessage>
			</svelte:fragment>
		</TextField>

		<Checkbox name="agree" required error={$errors.agree}>
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

		<Recaptcha bind:this={recaptchaRef} name="recaptcha" />

		<button
			disabled={!$isValid || $isSubmitting}
			type="submit"
			class="btn variant-filled-primary w-full"
		>
			{#if $isSubmitting}
				<span>
					<ProgressRadial width="w-4" meter="stroke-bg-1" track="stroke-bg-1/30" />
				</span>
			{/if}
			<span>Register Now</span>
		</button>
	</form>

	<Divider slotRoot="my-4">
		<span class="flex-shrink mx-4 font-bold text-content-2">OR</span>
	</Divider>

	<SocialMedia />
</Dialog>
