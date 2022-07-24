const importExpression = /^import (.+) from ['"]([\w/@.]*)['"];?$/gm;
const importReplacement = "import $1 from 'https://unpkg.com/$2?module';";

export const unpkgReplace = (source: string) => {
	return source.replace(importExpression, importReplacement);
};
