<script lang="ts">
	export const parent = {};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import TextField from '@/components/core/TextField.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';

	const schema = z.object({
		email: z.string().email().nonempty(),
		username: z
			.string()
			.min(3, '3-30 characters')
			.max(30, '3-30 characters')
			.regex(/[a-zA-Z]/, 'Only numbers and letters'),
		password: z
			.string()
			.min(8, 'At least 8 characters')
			.max(30, 'Length: 8-30')
			.regex(/.*[0-9].*/, '1 number')
			.regex(/.*[A-Z].*/, '1 uppercase')
			.regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), '1 special character')
	});

	const { form, errors } = createForm<z.infer<typeof schema>>({
		extend: [validator({ schema })]
	});

	const openLogin = () => {
		modalStore.close();
		modalStore.trigger({ type: 'component', component: 'login' });
	};

	const onSubmit = () => {
		errors.subscribe(() => {});
		console.log();
	};
</script>

{#if modalStore}
	<div class="card flex-col p-10 w-modal">
		<h2 class="h2 mb-2 font-bold">Register to Play</h2>
		<p class="text-content-2">
			Already a user?
			<button
				on:click={openLogin}
				class="no-underline hover:underline cursor-pointer self-start text-primary-500"
				>Login here</button
			>
		</p>
		<form use:form novalidate on:submit={onSubmit} class="flex flex-col gap-6 mt-6">
			<TextField label="Email" required name="email" type="email">
				<svelte:fragment slot="helpertext">
					<p class="text-content-2 text-xs leading-[13px]">Lowercase letters and numbers only</p>
					<ul class="text-error-500">
						{JSON.stringify($errors.email, null, 3)}
					</ul>
				</svelte:fragment>
			</TextField>
			<TextField label="Username" required name="username">
				<svelte:fragment slot="helpertext">
					<p class="text-content-2 text-xs leading-[13px]">Lowercase letters and numbers only</p>

					{#if $errors.username !== null}
						<ul class="text-error-500 list-disc list-inside marker:mr-10">
							Username must be:
							{#each $errors.username ?? [] as err}
								<li class="pl-4">
									{err}
								</li>
							{/each}
						</ul>
					{/if}
				</svelte:fragment>
			</TextField>

			<TextField label="Password" required name="password" type="password">
				<svelte:fragment slot="helpertext">
					{JSON.stringify($errors.email, null, 3)}
				</svelte:fragment>
			</TextField>

			<TextField label="Confirm Password" required name="confirmPw" type="password">
				<svelte:fragment slot="helpertext">
					{JSON.stringify($errors.email, null, 3)}
				</svelte:fragment>
			</TextField>

			<button type="submit" class="btn variant-filled-primary w-full">Register Now</button>
		</form>

		<slot />
	</div>
{/if}
