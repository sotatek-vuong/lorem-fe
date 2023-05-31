<script lang="ts">
	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import TextField from '@/components/core/TextField.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import Errors from './errors.svelte';
	import Checkbox from '@/components/core/Checkbox.svelte';
	import Recaptcha from '@/components/core/Recaptcha.svelte';
	import _ from 'lodash';

	const schema = z
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
				.regex(
					new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
					'1 special character',
				),
			confirmPw: z.string().nonempty('This field cannot be empty.'),
			agree: z.boolean().refine((s) => s, { message: 'Please check this to continue.' }),
			recaptcha: z.string().nonempty(),
		})
		.refine(({ password, confirmPw }) => password === confirmPw, {
			message: 'Password does not match.',
			path: ['confirmPw'],
		});

	const { form, data, errors, isValid } = createForm<z.infer<typeof schema>>({
		extend: [validator({ schema, level: 'error' })],
		onSubmit: (data) => {
			console.log(data);
		},
	});

	const openLogin = () => {
		modalStore.close();
		modalStore.trigger({ type: 'component', component: 'login' });
	};
</script>

{#if $modalStore[0]?.component === 'register'}
	<div class="card flex-col p-10 w-modal">
		<h2 class="h2 mb-2 font-bold">Register to Play</h2>
		<p class="text-content-2">
			Already a user?
			<button
				on:click={openLogin}
				class="no-underline hover:underline cursor-pointer self-start text-main">Login here</button
			>
		</p>
		<form use:form novalidate class="flex flex-col gap-6 mt-6">
			<TextField label="Username" required name="username" error={$errors.username !== null}>
				<svelte:fragment slot="helpertext">
					<Errors
						errorTitle="Username must be:"
						helperText={'Lowercase letters and numbers only'}
						errors={$errors.username}
					/>
				</svelte:fragment>
			</TextField>

			<TextField label="Email" required name="email" type="email" error={$errors.email !== null}>
				<svelte:fragment slot="helpertext">
					{#if $errors.email}
						{$errors.email[0]}
					{/if}
				</svelte:fragment>
			</TextField>

			<TextField
				label="Password"
				required
				name="password"
				type="password"
				error={$errors.password !== null}
			>
				<svelte:fragment slot="helpertext">
					<Errors
						helperText="Use 8 or more characters with at least 1 uppercase, numbers & symbols."
						errorTitle="Password must contain:"
						errors={$errors.password}
					/>
				</svelte:fragment>
			</TextField>

			<TextField
				label="Confirm Password"
				required
				name="confirmPw"
				type="password"
				error={$errors.confirmPw !== null}
			>
				<svelte:fragment slot="helpertext">
					{#if $errors.confirmPw}
						{$errors.confirmPw[0]}
					{/if}
				</svelte:fragment>
			</TextField>

			<Checkbox name="agree" required error>
				<svelte:fragment slot="label">
					I am above 18 years of age, and accept the
					<a href="/" class="underline" target="blank">Terms & Conditions</a>
				</svelte:fragment>
				<svelte:fragment slot="helpertext">
					{#if $errors.agree}
						{$errors.agree[0]}
					{/if}
				</svelte:fragment>
			</Checkbox>

			<Recaptcha bind:value={$data.recaptcha} />

			<button disabled={!$isValid} type="submit" class="btn variant-filled-primary w-full"
				>Register Now
			</button>
		</form>

		<slot />
	</div>
{/if}
