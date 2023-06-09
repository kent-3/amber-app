import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: dev ? '' : process.env.BASE_PATH,
		},
	},
	preprocess: [
		vitePreprocess({
			postcss: true
		})
	],
	vitePlugin: {
		inspector: {
			holdMode: true,
		}
	}
};

export default config;
