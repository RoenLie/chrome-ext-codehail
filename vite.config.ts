import { resolve } from 'path';
import { defineConfig, splitVendorChunk, SplitVendorChunkCache, splitVendorChunkPlugin } from 'vite';

import { chromeExtension } from './tools/chrome-ext.plugin.js';

/* ------------------------------------------------- */

export default defineConfig({

	base: '/dist/',

	build: {
		minify:        false,
		rollupOptions: {
			input: {
				main:   resolve(__dirname, 'index.html'),
				nested: resolve(__dirname, 'editor/index.html'),
			},
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
