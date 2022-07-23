import Fs from 'fs';
import Path from 'path';

/* ------------------------------------------------- */

export async function* getFiles(directory: string, pattern?: RegExp): AsyncGenerator<string, void, string | undefined> {
	const dirents = await Fs.promises.readdir(directory, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = Path.resolve(directory, dirent.name);
		if (dirent.isDirectory())
			yield* getFiles(res, pattern);
		else if (pattern?.test(res) ?? true)
			yield res;
	}
}

export const genToArray = async <T>(generated: AsyncIterable<T>): Promise<T[]> => {
	const out: T[] = [];
	for await (const x of generated)
		out.push(x);

	return out;
};
