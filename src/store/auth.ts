import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
import { writable } from 'svelte/store';

interface CurrentUser {
	initialized: boolean;
	username: string;
	email: string;
	photo: string;
}

export const currentUser = writable<CurrentUser | null>(null);

export function initializeGoogleAccounts() {
	let initialized = false;
	const unsubscribe = currentUser.subscribe((value) => {
		initialized = !!value?.initialized;
	});

	if (!initialized) {
		google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: async (res) => {
				console.log({ res });
			},
		});

		currentUser.set(true);
	}
	unsubscribe();

	async function googleCallback(response: google.accounts.id.CredentialResponse) {
		if (res.ok) {
			const fromEndpoint = await res.json();
			loginSession.set(fromEndpoint.user); // update loginSession store
			const { role } = fromEndpoint.user;

			let referrer;
			const unsubscribe = page.subscribe((p) => {
				referrer = p.url.searchParams.get('referrer');
			});
			unsubscribe();

			if (referrer) return goto(referrer);
			if (role === 'teacher') return goto('/teachers');
			if (role === 'admin') return goto('/admin');
			if (location.pathname === '/login') goto('/'); // logged in so go home
		}
	}
}
