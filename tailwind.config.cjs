/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			backgroundImage: {
				'secret-swirl':"url('/secret-swirl.png')",
				'secret-swirl-light':"url('/secret-swirl-light.png')"
			  },
			boxShadow: {
				'neumorphic': '5px 5px 20px #131313, -5px -5px 20px #4b4b4b'
			}
		},
	},
	plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require('@tailwindcss/line-clamp'),...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
}
