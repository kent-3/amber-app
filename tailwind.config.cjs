const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			backgroundImage: {
				'secret-swirl':"url('/secret-swirl.png')",
				'secret-swirl-light':"url('/secret-swirl-light.png')",
				'secret-swirl-amber':"url('/secret-swirl-amber.png')",
				'spotlights-dark':"radial-gradient(circle at 76% -20%, hsla(37,86%,61%,0.2) 0px, transparent 50%),radial-gradient(circle at 20% 120%, hsla(218,13%,53%,0.3) 0px, transparent 50%);",
				'spotlights-light':"radial-gradient(circle at 20% 120%, hsla(37,86%,61%,0.2) 0px, transparent 50%),radial-gradient(circle at 76% -20%, hsla(218,13%,53%,0.36) 0px, transparent 50%);"
			  },
			boxShadow: {
				'neumorphic': '5px 5px 20px #131313, -5px -5px 20px #4b4b4b',
				'right-lg': '10px 0 15px -3px rgb(0 0 0 / 0.1), 4px 0 6px -4px rgb(0 0 0 / 0.1)',
			},
			transitionTimingFunction: {
				'material-color': 'cubic-bezier(0.2, 0, 0, 1)'
			},
			fontFamily: {
				'sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
				// 'mono': ['Fira Code', ...defaultTheme.fontFamily.sans],
			}
		},
	},
	plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require('@tailwindcss/line-clamp'),...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
}
