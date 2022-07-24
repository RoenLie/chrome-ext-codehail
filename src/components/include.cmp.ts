import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { emitEvent } from '../helpers/emitEvent.js';
import { watch } from '../helpers/watch.js';
import { includeStyle } from './include.styles.js';
import { requestInclude } from './request';
/* ------------------------------------------------- */

/**
 *
 * @event es-load - Emitted when the included file is loaded.
 * @event {{ status: number }} es-error - Emitted when the included file fails to load due to an error.
 */
@customElement('es-include')
export class IncludeComponent extends LitElement {

	//#region controllers
	//#endregion


	//#region properties
	/**
    * The location of the HTML file to include.
    *
    * WARNING: Be sure you trust the content you are including as it will be executed as code and can result in XSS attacks.
    */
	@property() public src: string;

	/** The fetch mode to use. */
	@property() public mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

	/**
	 * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
	 * option can lead to XSS vulnerabilities in your app!
	 */
	@property({ attribute: 'allow-scripts', type: Boolean }) public allowScripts = false;
	//#endregion


	//#region lifecycle
	//#endregion


	//#region logic
	protected executeScript(script: HTMLScriptElement) {
		// Create a copy of the script and swap it out so the browser executes it
		const newScript = document.createElement('script');

		[ ...script.attributes ].forEach(attr => newScript.setAttribute(attr.name, attr.value));

		newScript.textContent = script.textContent;

		script.parentNode!.replaceChild(newScript, script);
	}

	@watch('src')
	protected async handleSrcChange() {
		try {
			const src = this.src;
			const file = await requestInclude(src, this.mode);

			// If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
			if (src !== this.src)
				return;


			if (!file.ok) {
				emitEvent(this, 'es-error', { detail: { status: file.status } });

				return;
			}

			this.innerHTML = file.html;

			if (this.allowScripts)
				[ ...this.querySelectorAll('script') ].forEach(script => this.executeScript(script));


			emitEvent(this, 'es-load');
		}
		catch {
			emitEvent(this, 'es-error', { detail: { status: -1 } });
		}
	}
	//#endregion


	//#region template
	public override render() {
		return html`
		<slot></slot>
		`;
	}
	//#endregion


	//#region style
	public static override styles: CSSResultGroup = includeStyle;
	//#endregion

}

/* ------------------------------------------------- */

declare global {
	interface HTMLElementTagNameMap {
		'es-include': IncludeComponent;
	}
}
