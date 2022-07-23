import { defineConfig } from 'vite';

import { chromeExtension } from './tools/chrome-ext.plugin.js';

/* ------------------------------------------------- */

export default defineConfig({

	build: {
		minify: false,
	},

	plugins: [ chromeExtension() ],
});
