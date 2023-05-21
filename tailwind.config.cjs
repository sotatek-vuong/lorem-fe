/** @type {import('tailwindcss').Config} */
module.exports = {
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {
			fontSize: {
				base: ['0.875rem', '1.25'],
			},
			spacing: { 1: '8px' },
			colors: {
				status: {
					red: '#da4545',
					green: '#10a342',
				},
				border: {
					1: '#383c43',
					2: '#808287',
				},
				bg: {
					1: '#151515',
					2: '#202020',
					3: '#282828',
				},
				content: {
					1: '#ffffff',
					2: '#999999',
					3: '#4f4f4f',
				},
				icon: '#888888',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwindcss/nesting'),
		// 3. Append the Skeleton plugin to the end of this list
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
	],
};
