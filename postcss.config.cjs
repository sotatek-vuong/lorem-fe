const config = {
	// plugins: [
	// 	//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
	// 	// tailwindcssNesting(postcssNesting()),
	// 	tailwindcss(),
	// 	//But others, like autoprefixer, need to run after,
	// 	autoprefixer,
	// ],
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		'@thedutchcoder/postcss-rem-to-px': {},
		autoprefixer: {},
	},
};

module.exports = config;
