import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { CHSourceEditorCmp } from './source-editor.cmp.js';

CHSourceEditorCmp;
/* ------------------------------------------------- */


@customElement('ch-editor')
export class CHEditorCmp extends LitElement {


	public override connectedCallback() {
		super.connectedCallback();
	}

	public override disconnectedCallback() {
		super.disconnectedCallback();
	}

	protected async handleSave() {
		const editor = this.shadowRoot?.querySelector<CHSourceEditorCmp>('.editor');
		const source = editor?.source ?? '';
		console.log('SENT TO WORKER FOR TRANSPILATION', source);
		await chrome.storage.sync.set({ source });
	}

	protected async handleLoad() {
		const { transpiled } = await chrome.storage.sync.get('transpiled');
		console.log('GOT TRANSPILED', transpiled);

		return transpiled;
	}

	protected async handleRun() {
		await this.handleSave();
		//const transpiled = await this.handleLoad();

		//const windows = await chrome.windows.getAll();

		//console.log(windows);
		//console.log(windows.map(w => console.log(w.tabs)));

		let tabs = await chrome.tabs.query({ active: true, currentWindow: false });
		const tab = tabs.at(0);

		if (!tab?.id) {
			console.error('did not find an active tab');

			return;
		}


		//const iframeEl = document.createElement('iframe');
		//document.body.appendChild(iframeEl);

		//const content = iframeEl.contentWindow;

		//content.eval('console.log("test");');


		//document.documentElement.setAttribute('onreset', `
		//console.log('hei');
		//`);

		//document.documentElement.dispatchEvent(new CustomEvent('reset'));
		////const saved = document.documentElement.onreset;
		//document.documentElement.removeAttribute('onreset');
		//console.log({ saved });


		//const func = new Function(`
		//document.body.style.setProperty('background-color', 'hotpink');
		//`);

		//console.log(func);


		//chrome.scripting.executeScript({
		//	target: { tabId: tab.id },
		//	func:   func as any,
		//});


		//chrome.scripting.executeScript({
		//	target: { tabId: tab.id },
		//	func:   async function() {
		//		chrome.storage.sync.get(({ transpiled, func }) => {
		//			console.log('running script', { transpiled, func });
		//			//class Square extends HTMLElement {

		//			//	constructor() {
		//			//		super();

		//			//		const shadow = this.attachShadow({ mode: 'open' });
		//			//	}

		//			//	public connectedCallback() {
		//			//		console.log('Custom square element added to page.');
		//			//		const scriptEl = document.createElement('script');
		//			//		scriptEl.textContent = 'window.alert("Hello!")';

		//			//		document.body.appendChild(scriptEl);
		//			//	}

		//			//	public disconnectedCallback() {
		//			//		console.log('Custom square element removed from page.');
		//			//	}

		//			//}


		//			//customElements.define('custom-square', Square);
		//			//const squareEl = document.createElement('custom-square');
		//			//document.body.appendChild(squareEl);


		//			//const sHtml = '<script>window.alert("Hello!")</script>';
		//			//const frag = document.createRange().createContextualFragment(sHtml);
		//			//document.body.appendChild(frag);

		//			//const test = new DOMParser();
		//			//const doc = test.parseFromString(`
		//			//<script type="module">
		//			//console.log('domparser maybe');
		//			//setTimeout(() => {
		//			//	console.log('domparser maybe');
		//			//}, 3000);
		//			//</script>
		//			//`, 'text/html');

		//			////console.log(doc.head.firstChild);


		//			//const node = document.body.appendChild(doc.head.firstChild!);
		//			//node.textContent = node.textContent;
		//			//console.log(node);

		//			//console.log(doc);


		//			//let actualCode = '(' + function() {
		//			//// All code is executed in a local scope.
		//			//// For example, the following does NOT overwrite the global `alert` method
		//			//	let alert = null;
		//			//	// To overwrite a global variable, prefix `window`:
		//			//	window.alert = null;
		//			//} + ')();';
		//			//let script = document.createElement('script');
		//			//script.textContent = actualCode;
		//			//(document.head || document.documentElement).appendChild(script);
		//			//script.remove();

		//			//document.documentElement.setAttribute('onreset', transpiled);
		//			//document.documentElement.dispatchEvent(new CustomEvent('reset'));
		//			//document.documentElement.removeAttribute('onreset');
		//		});
		//	},
		//});
	}


	public override render() {
		return html`
			<div class="editor-wrapper">
				<ch-source-editor class="editor" source="const iAmAlive=true;"></ch-source-editor>
			</div>

			<div>
				<button @click=${ () => this.handleSave() }>SAVE</button>
				<button @click=${ () => this.handleLoad() }>LOAD</button>
				<button @click=${ () => this.handleRun() }>RUN</button>
			</div>
		`;
	}

	public static override styles = [
		css`
		.editor-wrapper {
			display: grid;
			overflow: hidden;
		}
		`,
	];

}


declare global {
	interface HTMLElementTagNameMap {
		'ch-editor': CHEditorCmp;
	}
}
