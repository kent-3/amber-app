import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			// Whether to polyfill `node:` protocol imports.
			protocolImports: false,
		  }),
	]
});
