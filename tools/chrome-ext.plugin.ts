import Fs from 'fs';
import Path from 'path';
import { Plugin, transformWithEsbuild } from 'vite';

import { genToArray, getFiles } from './file-helpers.js';

/* ------------------------------------------------- */

export const chromeExtension = (): Plugin => {
	let validMode = false;

	const relativePath = '/ping-reload.json';
	const pingPath = '/dist' + relativePath;

	const pingReloadID = 'virtual:ping-reload';
	const pingReloadContent = `
	export {};
	const timeLoaded = Date.now();
	const reloadInterval = window.setInterval(() => reloader(), 1000);
	const reloader = async () => {
		try {
			const { lastUpdated } = await (await fetch('.${ relativePath }')).json();

			const newerFileExists = lastUpdated > timeLoaded;
			if (newerFileExists) {
				window.clearInterval(reloadInterval);
				location.reload();
			}
		} catch(err) { /*  */ }
	};
	console.log('Loaded:' + new Date().toJSON());
	`;

	return {
		name: 'vite-plugin-chrome-extension',

		configResolved(config) {
			if (config.build.watch && config.mode === 'production')
				validMode = true;
		},

		resolveId(id) {
			if (id === pingReloadID)
				return pingReloadID;
		},

		async load(id) {
			if (id !== pingReloadID)
				return;

			const buildResult = await transformWithEsbuild(
				validMode ? pingReloadContent : 'export {};', 'pingReload.ts', { sourcemap: true },
			);

			return buildResult;
		},

		async buildEnd() {
			const files = await genToArray(getFiles('./background', /\.ts/));

			files.forEach(async path => {
				let pathInfo = Path.parse(path);

				let fileContent = Fs.readFileSync(path, { encoding: 'utf8' });
				let buildResult = await transformWithEsbuild(fileContent, pathInfo.name);

				let targetDir = Path.resolve('./dist/background');
				let targetPath = Path.resolve(targetDir, pathInfo.name + '.js');

				await Fs.promises.mkdir(targetDir, { recursive: true });
				Fs.promises.writeFile(targetPath, buildResult.code);
			});
		},

		closeBundle() {
			if (validMode)
				Fs.writeFileSync('.' + pingPath, JSON.stringify({ lastUpdated: Date.now() }, null, 4));
		},
	};
};
