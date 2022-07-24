import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { CHSourceEditorCmp } from './source-editor.cmp.js';

CHSourceEditorCmp;
/* ------------------------------------------------- */


@customElement('ch-editor')
export class CHEditorCmp extends LitElement {


	public override connectedCallback(): void {
		super.connectedCallback();
	}


	public override render() {
		return html`
			<div class="editor-wrapper">
				<ch-source-editor class="editor" source="const iAmAlive=true;"></ch-source-editor>
			</div>

			<button>EXPORT CODE TO EXTENSION FOR TRANSPILE</button>
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
