import { resolve } from 'path';
import { defineConfig } from 'vite';

/* ------------------------------------------------- */

export default defineConfig({
	build: {
		lib: {
			entry:    resolve(__dirname, 'src/worker.ts'),
			name:     'MyLib',
			// the proper extensions will be added
			fileName: 'my-lib',
			formats:  [ 'es' ],
		},
	},
});
