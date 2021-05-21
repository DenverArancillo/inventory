const colors = require('tailwindcss/colors')

module.exports = {
	purge: [
		'./storage/framework/views/*.php',
		'./resources/**/*.blade.php',
		'./resources/**/*.js',
	],
	darkMode: false, // or 'media' or 'class'
	// corePlugins: {
	// 	outline: false
	// },
	theme: {
		extend: {
			colors: {
				'light-blue': colors.lightBlue,
				cyan: colors.cyan,
			},
		},
	},
	variants: {
	extend: {},
	},
	plugins: [],
}
