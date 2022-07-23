export {};

chrome.runtime.onInstalled.addListener(() => {
//	chrome.storage.sync.set({ color });
//	console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.action.onClicked.addListener(tab => {
	const newWindow = chrome.windows.create({
		url:     chrome.runtime.getURL('../dist/index.html'),
		type:    'popup',
		focused: true,
		width:   500,
		height:  800,
		top:     300,
	});

	console.log(newWindow);
});

chrome.webRequest.onBeforeRequest.addListener((e) => {
	console.log('before url request', e);

	//const exists = (await fetch(e.url));
	//console.log(exists);
	//if (!exists) {
	//chrome.windows.create({
	//	url: chrome.runtime.getURL("../dist/index.html"),
	//	type: "popup",
	//	focused: true,
	//	width: 500,
	//	height: 800,
	//	top: 300
	//});
	//}
},
{ urls: [ '<all_urls>' ], types: [ 'script' ] });

//chrome.webRequest.onCompleted.addListener(async (e) => {
//	console.log('web request completed', e);
//	const kake = await fetch(e.url);

//	if (!kake)
//		console.log('the url requests did not exist, should redirect now');
//},
//	{ urls: ["chrome-extension://*/dist/*"], types: ['script'] },
//);
