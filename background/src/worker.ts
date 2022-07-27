//import { transpile } from 'typescript';

export {};
chrome.runtime.onInstalled.addListener(() => {
	const fn = new Function('console.log("evaled");');
	console.log(fn);


//	chrome.storage.sync.set({ color });
//	console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.action.onClicked.addListener(tab => {
	const newWindow = chrome.windows.create({
		url:     chrome.runtime.getURL('../../editor/dist/index.html'),
		type:    'popup',
		focused: true,
		width:   800,
		height:  600,
		top:     50,
	});

	console.log(newWindow);
});

chrome.storage.onChanged.addListener((changes) => {
	console.log('worker for changes', { changes });

	if (changes['source'] === undefined)
		return;

	const sourceObj = changes['source']!;

	console.log('storage file changed', { changes });
	const source = sourceObj?.newValue ?? sourceObj?.oldValue ?? '';


	//chrome.storage.sync.set({
	//	transpiled: transpile(source),
	//	func:       new Function('console.log("from background")'),
	//});
});


//chrome.webRequest.onBeforeRequest.addListener((e) => {
//	console.log('before url request', e);
//	const build = transpile('const test:string = "hei"');
//	console.log({ build });

//	//const exists = (await fetch(e.url));
//	//console.log(exists);
//	//if (!exists) {
//	//chrome.windows.create({
//	//	url: chrome.runtime.getURL("../dist/index.html"),
//	//	type: "popup",
//	//	focused: true,
//	//	width: 500,
//	//	height: 800,
//	//	top: 300
//	//});
//	//}
//},
//{ urls: [ '<all_urls>' ], types: [ 'script' ] });
