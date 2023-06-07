import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// for adapter-static
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false,
			strict: true
		})
		// for adapter-node
		// adapter: adapter({
		// 	// default options are shown
		// 	out: 'build',
		// 	precompress: false,
		// 	envPrefix: '',
		// 	polyfill: true
		// })
	},
	preprocess: [
		vitePreprocess({
			postcss: true
		}),
		preprocess({
			postcss: true
		})
	],
	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true
			}
		}
	}
};

export default config;
