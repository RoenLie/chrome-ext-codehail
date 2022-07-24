import { type PropertyValues, css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { IncludeComponent } from '../components/include.cmp.js';

IncludeComponent;
/* ------------------------------------------------- */

@customElement('ch-editor-page')
export class EditorPage extends LitElement {

	@query('.editor') public editorRef: HTMLElement;

	public override firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
	}

	public override render() {
		return html`
		<es-include src="editor/index.html" allow-scripts></es-include>
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
