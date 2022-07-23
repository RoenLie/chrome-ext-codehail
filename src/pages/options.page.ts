import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/* ------------------------------------------------- */

@customElement('ch-options-page')
export class OptionsPage extends LitElement {

	//#region state
	//#endregion state


	//#region properties
	//#endregion properties


	//#region logic
	//#endregion logic


	//#region controllers
	//#endregion controllers


	//#region lifecycle
	//#endregion lifecycle


	//#region template
	public override render() {
		return html`
			<div>Options page</div>
		`;
	}
	//#endregion template


	//#region style
	public static override styles = [
		css`
		:host {
			display: flex;
			background-color: grey;
			border: 1px solid black;
		}
	`,
	];
	//#endregion style

}


declare global {
	interface HTMLElementTagNameMap {
		'ch-options-page': OptionsPage;
	}
}
