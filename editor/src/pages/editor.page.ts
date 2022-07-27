import { type PropertyValues, css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { CHEditorCmp } from '../components/editor/editor.cmp.js';

CHEditorCmp;
/* ------------------------------------------------- */

@customElement('ch-editor-page')
export class EditorPage extends LitElement {

	@query('.editor') public editorRef: HTMLElement;

	public override firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
	}

	public override render() {
		return html`
		<ch-editor style="display: grid;"></ch-editor>
		`;
	}

	public static override styles = [
		css`
		:host {
			display: grid;
			grid-auto-rows: min-content;
			background-color: grey;
			border: 1px solid black;
			overflow: auto;
		}

		es-include {
			display: grid;
		}
	`,
	];

}

/* ------------------------------------------------- */

declare global {
	interface HTMLElementTagNameMap {
		'ch-editor-page': EditorPage;
	}
}
