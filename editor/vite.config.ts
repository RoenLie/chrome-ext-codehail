import { defineConfig, splitVendorChunkPlugin } from 'vite';

import { chromeExtension } from './tools/chrome-ext.plugin.js';

/* ------------------------------------------------- */

export default defineConfig({

	base: 'editor/dist/',

	build: {
		minify:        false,
		rollupOptions: {
			//output: {
			//sourcemap: true,
			//manualChunks: {
			//	monaco: [ 'monaco-editor' ],
			//},
			//},
		},

	},

	plugins: [ splitVendorChunkPlugin(), chromeExtension() ],
});
