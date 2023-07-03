/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,js,ts}'],
	theme: {
		extend: {
			colors: {
				main: '#ffd610',
				status: {
					error: '#da4545',
					success: '#10a342',
				},
				divider: '#383c43',
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
	daisyui: {
		themes: [
			{
				lorem: {
					primary: '#ffd610',
					neutral: '#202020',
					'base-100': '#151515',
					success: '#10a342',
					error: '#da4545',
				},
			},
		],
		darkTheme: true,
	},
	plugins: [require('@tailwindcss/forms'), require('tailwindcss/nesting'), require('daisyui')],
};
