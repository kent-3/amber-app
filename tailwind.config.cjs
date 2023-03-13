/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			backgroundImage: {
				'secret-swirl':"url('/secret-swirl.png')"
			  }
		},
	},
	plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require('@tailwindcss/line-clamp'),...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
}
